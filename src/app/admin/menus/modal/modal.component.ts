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
  selector: 'admin-modal-sections-dialog',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly http: HttpClient
  ) {

  }

  ngOnInit(): void {}

  onSubmit() {
  }

  onEdit(id: number) {
  }
}