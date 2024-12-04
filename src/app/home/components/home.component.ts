import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IDoctor, IService, ISpecialization } from './interfaces/home.interface';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  services: IService[] = [];
  specializations: ISpecialization[] = [];
  doctors: IDoctor[] = [];
  
  carouselOptions: OwlOptions
  dataLoaded: boolean = false;

  constructor(private readonly homeService: HomeService) {
    this.carouselOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      rtl: true,
      margin: 10,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 4,
        },
      },
      nav: false,
    };
  }

  ngOnInit() {
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        this.doctors = data.doctors;
        this.services = data.services;
        this.specializations = data.specializations;
        this.dataLoaded = true;
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
