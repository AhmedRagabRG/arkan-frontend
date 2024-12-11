import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DoctorsAdminModalComponent } from './modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../home/home.service';
import { IDoctor, IService, ISpecialization } from '../../home/interfaces/home.interface';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {

  services: IService[] = [];
  specializations: ISpecialization[] = [];
  doctors: IDoctor[] = [];

  readonly dialog = inject(MatDialog);

  daysOpetionsClosed: boolean = true;
  isLeftSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();

  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });

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
