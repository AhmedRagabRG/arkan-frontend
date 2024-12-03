import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent {
  dates: any = [];
  times: any = [];
  date3: Date | undefined;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;


  constructor(private modalService: ModalService, private viewContainerRef: ViewContainerRef) {
    const initialValue = new Date();
    initialValue.setHours(12, 30, 0);
    this.formControl = new FormControl(initialValue);
  }
  formControl: FormControl<Date | null>;

  openModal(modelTemplete: TemplateRef<any>) {
    this.modalService.open(modelTemplete, this.viewContainerRef);
  }
}


