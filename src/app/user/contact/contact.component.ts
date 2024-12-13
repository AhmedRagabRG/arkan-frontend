import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  form: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(20)]),
    });
  }

  submit() {
    const { name, phoneNumber, message } = this.form.value
    this.http.post(`${environment.baseUrl}/contact`, { name, phoneNumber, message }).subscribe({
      next: () => {
        this.form.reset()
      },
      error: (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    })
  }
}
