import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment.development";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";

/**
 * Dialog component for adding/editing a doctor.
 *
 * When adding, all fields are empty.
 * When editing, the fields are prefilled with the doctor's data.
 *
 * The component automatically handles the close event of the dialog.
 *
 * @example
 * const dialogRef = this.dialog.open(DoctorsAdminModalComponent, {
 *   data: {
 *     name: 'John Doe',
 *     specialization: 'General Medicine',
 *     img: 'https://example.com/john-doe.jpg',
 *     days: ['الجمعة', 'السبت'],
 *   },
 * });
 *
 * dialogRef.afterClosed().subscribe(result => {
 *   console.log(`Dialog result: ${result}`);
 * });
 */
@Component({
  selector: 'admin-modal-dialog',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsAdminModalComponent implements OnInit {
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

  constructor(
    private dialogRef: MatDialogRef<DoctorsAdminModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly http: HttpClient
  ) {
    this.form = new FormGroup({
      name: new FormControl(data.name || '', [Validators.required, Validators.minLength(3)]),
      specialization: new FormControl(data.specialization || '', [Validators.required]),
      img: new FormControl(data.img || '', [Validators.required]),
      workDays: new FormArray(this.workDays.map((workDay) => {
        const isChecked = data.days?.includes(workDay.name);
        return new FormControl(isChecked);
      })),
    });
  }

  get selectedWorkDays() {
    return this.form.value.workDays
      .map((selected: boolean, i: number) => selected ? this.workDays[i].name : null)
      .filter(((day: string) => day !== null));
  }

  ngOnInit(): void {}

  onSubmit() {
    const { name, specialization, img } = this.form.value

    const payload = {
      name: name,
      specializationId: +specialization,
      days: JSON.stringify(this.selectedWorkDays),
      img: img,
    };

    this.http.post(`${environment.baseUrl}/doctor`, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => console.error('حدث خطأ أثناء الإرسال'),
    });
  }

  onEdit(id: number) {
    const { name, specialization, img } = this.form.value
    const payload = {
      name: name,
      specializationId: +specialization,
      days: JSON.stringify(this.selectedWorkDays),
      img: img,
    };

    this.http.patch(`${environment.baseUrl}/doctor/${id}`, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => console.error('حدث خطأ أثناء الإرسال'),
    });
  }
}