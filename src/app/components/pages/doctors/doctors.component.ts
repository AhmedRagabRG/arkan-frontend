import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { IDoctor, ISpecialization } from '../home/interfaces/home.interface';
import { BreadcrumbComponent } from '../../partial/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent implements OnInit {
  doctors: IDoctor[] = [];
  specializations: ISpecialization[] = [];

  constructor(private readonly homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        this.doctors = data.doctors;
        this.specializations = data.specializations;
      },
      error: (err) => {
        console.error('Error occurred while fetching data:', err);
      },
    });
  }


  getSpecializationName(id: number) {
    return this.specializations.find((specialization) => specialization.id === id)?.name ?? '';
  }
}