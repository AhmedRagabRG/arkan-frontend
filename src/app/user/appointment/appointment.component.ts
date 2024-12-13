import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { environment } from '../../../environments/environment.development';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { IDoctor } from '../home/interfaces/home.interface';
import { IDate, IEvent } from './interfaces/events';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  calendarOptions!: CalendarOptions;
  isBrowser: boolean;

  dates: IDate[] = [];
  times: string[] = [];
  currentYear: number;
  currentMonth: number;

  availableTimes: string[] = [];
  availableServices: string[] = ['كشف', 'فحوصات', 'عمليات'];

  doctors: IDoctor[] = [];
  events = signal<IEvent[]>([]);

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.store.subscribe((state: any) => {
      this.doctors = state['home'].doctors;
      this.handleDoctorsData();
    });
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
      eventMouseEnter: (el) => {},
      dateClick: (arg: DateClickArg) => this.handleDateClick(arg),
      events: this.events(),
    };
  }

  handleDoctorsData() {
    this.doctors.forEach((item: IDoctor) => {
      const days = JSON.parse(item.days);
      const dates = this.getNextFiveMonthsDates(days);
      this.events.set([
        ...this.events(),
        ...dates.map((date: string) => (
          {
            title: item.name,
            date,
          })),
      ]);
    });
  }

  openModal(date: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        availableTimes: this.availableTimes,
        availableServices: this.availableServices,
        date,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleDateClick(arg: { dateStr: string }) {
    const { dateStr } = arg;
    const [year, month, day] = dateStr.split('-');

    const givenDate = new Date(dateStr);
    const currentDate = new Date();
    if (currentDate > givenDate) return;

    const isAvailableDate = this.events().find((event) => event.date === dateStr);
    if (!isAvailableDate) return;

    this.http
      .get(`${environment.baseUrl}/appointment/${day}/${month}/${year}`)
      .subscribe({
        next: (response) => {
          this.dates = Object.values(response);
          this.availableTimes = this.generateTimes();
          this.openModal(dateStr);
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
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(
        2,
        '0'
      )}`;
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);
    let current = start;

    const availableTimes: string[] = [];
    const bookedTimes: Set<string | null> = new Set(
      this.dates.map((item: IDate) =>
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

  getNextFiveMonthsDates(daysOfWeek: string[]): string[] {
    const result: string[] = [];
    const today = new Date();
    const nextFiveMonths = new Date(
      today.getFullYear(),
      today.getMonth() + 5,
      today.getDate()
    );
    const dayIndices = daysOfWeek.map((day) =>
      [
        'الاحد',
        'الاثنين',
        'الثلاثاء',
        'الاربعاء',
        'الخميس',
        'الجمعة',
        'السبت',
      ].indexOf(day.trim().toLowerCase())
    ).filter((index) => index !== -1);

    if (dayIndices.length === 0) {
      console.warn('No valid days found in the input array.');
      return [];
    }
    for (
      let currentDate = new Date(today);
      currentDate <= nextFiveMonths;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      if (dayIndices.includes(currentDate.getDay())) {
        result.push(currentDate.toISOString().split('T')[0]);
      }
    }
    return result;
  }
}
