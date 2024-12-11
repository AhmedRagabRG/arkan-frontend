import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { environment } from '../../environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent {
  calendarOptions: CalendarOptions
  readonly dialog = inject(MatDialog);

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  dates: any = [];
  times: any = [];
  currentYear: any;
  currentMonth: any;
  availableTimes: string[] = []
  availableServices: string[] = [
    'كشف',
    'فحوصات',
    'عمليات'
  ]

  events = [];

  constructor(
    private readonly appointmentService: AppointmentService,
    private http: HttpClient,
    private datePipe: DatePipe,
  ) {
    this.appointmentService.getDoctors().subscribe({
      next: (res) => {
        this.events = res
      },
      error: (err) => {
        console.error('Error occurred while processing events:', err);
      },
    })

    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: 'ar',
      direction: 'rtl',
      headerToolbar: {
        end: 'next,today',
      },
      businessHours: {
        daysOfWeek: [0, 1, 2, 3, 4, 6],
      },
      buttonText: {
        today: 'اليوم',
      },
      height: 750,
      plugins: [dayGridPlugin, interactionPlugin],
      eventMouseEnter: (el) => {
        console.log(el)
      },
      dateClick: (arg: any) => this.handleDateClick(arg),
      events: this.events
    };
  }

  ngOnInit() {
  }


  openModal(date: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        availableTimes: this.availableTimes,
        availableServices: this.availableServices,
        date
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleDateClick(arg: any) {
    const { dateStr } = arg
    const [year, month, day] = dateStr.split('-')

    this.http.get(`${environment.baseUrl}/appointment/${day}/${month}/${year}`).subscribe({
      next: (response: any) => {
        this.dates = Object.values(response);
        this.availableTimes = this.generateTimes();
        this.openModal(dateStr)
      },
      error: (error) => {
        console.error('Error occurred while fetching data:', error);
      },
    });
  }

  generateTimes(
    interval: number = 15,
    startTime: string = '04:15',
    endTime: string = '10:15'
  ): string[] {
    const parseTime = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const formatTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);
    let current = start;

    const availableTimes: string[] = [];
    const bookedTimes: Set<string> = new Set(
      this.dates.map((item: any) =>
        this.datePipe.transform(item.date, 'HH:mm', 'z')
      )
    );

    while (current <= end) {
      const time = formatTime(current);
      if (!bookedTimes.has(time)) {
        availableTimes.push(time);
      }
      current += interval;
    }

    return availableTimes;
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear++;
    }
  }
}
