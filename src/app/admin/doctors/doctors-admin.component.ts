import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IDoctor, IService, ISpecialization } from '../../user/home/interfaces/home.interface';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../user/home/home.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { DoctorsAdminModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './doctors-admin.component.html',
  styleUrl: './doctors-admin.component.css',
})
export class DoctorsAdminComponent {
  services: IService[] = [];
  specializations: ISpecialization[] = [];
  doctors: IDoctor[] = [];

  readonly dialog = inject(MatDialog);

  daysOpetionsClosed: boolean = true;
  constructor(
    private readonly homeService: HomeService,
    private readonly http: HttpClient
  ) 
  {}

  ngOnInit(): void {
    this.homeService.getHomeData().pipe(tap(data => {
      this.doctors = Object.values(data.doctors);
      this.specializations = Object.values(data.specializations);
      this.services = Object.values(data.services);
    })).subscribe({
      error: (err) => {
        console.error('Error occurred while fetching data:', err);
      }
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(DoctorsAdminModalComponent, {
      data: {
        doctors: this.doctors,
        specializations: this.specializations,
        services: this.services
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editDoctor(id: number) {
    const doctorData = this.findDoctor(id);
    const dialogRef = this.dialog.open(DoctorsAdminModalComponent, {
      data: {
        specializations: this.specializations,
        id: doctorData?.id,
        name: doctorData?.name,
        specialization: this.getSpecializationName(doctorData?.specializationId!),
        img: doctorData?.img,
        days: doctorData?.days
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  remveDoctor(id: number) {
    if (!id) {
      return;
    }
    this.http.delete(`${environment.baseUrl}/doctor/${id}`).subscribe({
      next: () => {
        console.log('تم الإرسال بنجاح')
      },
      error: () => console.error('حدث خطأ أثناء الإرسال'),
    });
  }

  getSpecializationName(id: number) {
    return this.specializations.find((specialization) => specialization.id === id)?.name ?? '';
  }

  findDoctor(id: number) {
    return this.doctors.find((doctor) => doctor.id === id);
  }
}
