import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IDoctor, IService, ISpecialization } from '../interfaces/home.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  staticServices: IService[] = [
    {
      id: 1,
      title: 'العيادات الخارجية',
      content: 'نقدم استشارات طبية شاملة وتشخيص دقيق لحالتك الصحية.',
      img: './images/svgs/clinic.svg',
    },
    {
      id: 2,
      title: 'الفحوصات و ابحاث العيون',
      content: 'نوفر أحدث التقنيات لإجراء الفحوصات الدقيقة وتشخيص أمراض العيون.',
      img: './images/svgs/eye-exam.svg',
    },
    {
      id: 3,
      title: 'العمليات الجراحية',
      content: 'إجراء العمليات الجراحية بأحدث الأجهزة وتحت إشراف خبراء متخصصين.',
      img: './images/svgs/eye-care.svg',
    },
  ];
  
  services: IService[] = [];
  specializations: ISpecialization[] = [];
  doctors: IDoctor[] = [];

  carouselOptions: OwlOptions

  constructor(
    private store: Store<AppState>,
  ) {
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
    this.store.subscribe((state: any) => {
      this.doctors = state['home'].doctors;
      this.services = state['home'].services;
      this.specializations = state['home'].specializations;
    });
  }

  /**
   * Gets the name of the specialization with the given id.
   * @param id the id of the specialization
   * @returns the name of the specialization, or an empty string if no specialization with the given id is found
   */
  getSpecializationName(id: number) {
    return this.specializations.find((specialization) => specialization.id === id)?.name ?? '';
  }
}


