import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AppointmentComponent } from './appointment.component';
import { NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { AppointmentService } from './appointment.service';


@NgModule({
  declarations: [
    AppointmentComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatDialogModule, MatButtonModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    AppointmentService
  ],
})
export class AppointmentModule { }
