import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-appointment',
  imports: [FormsModule, DropdownModule],
  standalone: true,
  templateUrl: './appointment.component.html',
  providers: [DatePipe]
})
export class AppointmentComponent {
  dates: any = [];
  times: any = [];
  currentYear: any;
  currentMonth: any;

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;


  constructor(private modalService: ModalService, private viewContainerRef: ViewContainerRef, private http: HttpClient, private datePipe: DatePipe) {
    const initialValue = new Date();
    initialValue.setHours(12, 30, 0);
    this.formControl = new FormControl(initialValue);

    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
  }
  formControl: FormControl<Date | null>;

  openModal(modelTemplete: TemplateRef<any>) {
    this.modalService.open(modelTemplete, this.viewContainerRef);
  }

  cities: any;

  selectedCity: any;

  generateTimes(
    interval: number = 15,
    startTime: string = '04:15',
    endTime: string = '10:15'
  ): string[] {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let current = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    // Initialize times array
    const availableTimes: string[] = [];

    while (current <= end) {
      const hours = Math.floor(current / 60);
      const minutes = current % 60;

      // Convert current time to minutes for comparison
      const currentTimeInMinutes = hours * 60 + minutes;

      this.dates.forEach((item: any) => {
        const itemTime = new Date(item.date);
        const itemTimeInMinutes = (itemTime.getHours()) * 60 + itemTime.getMinutes();

        if (itemTimeInMinutes !== currentTimeInMinutes) {
          availableTimes.push(
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
          );
        }
      });

      current += interval;
    }

    return availableTimes;
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/appointment/03/12/2024').subscribe({
      next: (response) => {
        this.dates = Object.values(response);
        const availableTimes = this.generateTimes();
        console.log(availableTimes);
      },
      error: (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    });
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 12) {
      this.currentMonth = new Date().getMonth() + 1;
    }
  }
}


