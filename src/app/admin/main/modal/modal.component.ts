import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment.development";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ChangeDetectionStrategy, Component, Inject, Input, TemplateRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'admin-modal-dialog',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsAdminModalComponent {
  @ViewChild('notify') public readonly notify!: SwalComponent;

  form: FormGroup;

  workDays = [
    { name: 'الجمعة' },
    { name: 'السبت' },
    { name: 'الأحد' },
    { name: 'الاثنين' },
    { name: 'الثلاثاء' },
    { name: 'الاربعاء' },
    { name: 'الخميس' },
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private readonly http: HttpClient) {
    this.form = new FormGroup({
      name: new FormControl(data.name || '', [Validators.required]),
      specialization: new FormControl(data.specialization || '', [Validators.required]),
      img: new FormControl(data.img || '', [Validators.required]),
      workDays: new FormArray(this.workDays.map(() => new FormControl(false))),
    });
  }

  get selectedWorkDays() {
    return this.form.value.workDays
      .map((selected: boolean, i: number) => selected ? this.workDays[i].name : null)
      .filter(((day: any) => day !== null));
  }

  onSubmit() {
    const { name, specialization, img } = this.form.value

    const payload = {
      name: name,
      specializationId: 1,
      days: JSON.stringify(this.selectedWorkDays),
      img: img,
    };

    this.http.post(`${environment.baseUrl}/doctor`, payload).subscribe({
      next: () => {
       
      },
      error: () => console.error('حدث خطأ أثناء الإرسال'),
    });
  }
}