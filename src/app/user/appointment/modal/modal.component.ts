import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-dialog',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
    service: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  });
  selectedDate: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private readonly http: HttpClient) {
    this.selectedDate = data.date;
  }

  submit() {
    const { name, phoneNumber, service, time } = this.form.value
    if (name && phoneNumber && service && time) {
      const handledDate = this.handleDate(this.selectedDate, time)
      this.http.post(`${environment.baseUrl}/appointment`, { name, phoneNumber, service, time, date: handledDate }).subscribe({
        next: () => {
          this.form.reset()
        },
        error: (error) => {
          console.error('Error occurred while fetching data:', error);
        }
      })
    }
  }

  handleDate(inputDate: string, inputTime: string) {
    const [hours, minutes] = inputTime.split(':').map(Number);
    const date = new Date(inputDate);
    date.setHours(hours + 2, minutes, 0, 0);
    // const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ') + '.000';
    return date
  }
}