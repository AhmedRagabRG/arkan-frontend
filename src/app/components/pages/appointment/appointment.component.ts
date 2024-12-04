import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-appointment',
  imports: [FormsModule, DropdownModule, ReactiveFormsModule, CommonModule, FullCalendarModule],
  standalone: true,
  templateUrl: './appointment.component.html',
  providers: [DatePipe],
})
export class AppointmentComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  calendarOptions: CalendarOptions = {
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
  };

  handleDateClick(arg: any) {
    console.log(arg)
    const { dateStr } = arg
    const [year, month, day] = dateStr.split('-')

    this.http.get(`http://localhost:3000/appointment/${day}/${month}/${year}`).subscribe({
      next: (response: any) => {
        this.dates = Object.values(response);
        this.availableTimes = this.generateTimes();
        this.openModal(this.modalContent)
      },
      error: (error) => {
        console.error('Error occurred while fetching data:', error);
      },
    });

  }

  form = new FormGroup({
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    doctor: new FormControl(''),
    service: new FormControl(''),
    time: new FormControl(''),
    specialization: new FormControl(''),
  });

  dates: any = [];
  times: any = [];
  currentYear: any;
  currentMonth: any;
  availableTimes: string[] = []



  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
  }

  openModal(modelTemplete: TemplateRef<any>) {
    this.modalService.open(modelTemplete, this.viewContainerRef);
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

  ngOnInit() {
    this.http.get('http://localhost:3000/appointment/03/12/2024').subscribe({
      next: (response: any) => {
        this.dates = Object.values(response);
        this.availableTimes = this.generateTimes();
      },
      error: (error) => {
        console.error('Error occurred while fetching data:', error);
      },
    });
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear++;
    }
  }
}
