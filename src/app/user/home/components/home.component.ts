import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IDoctor, IService, ISpecialization } from '../interfaces/home.interface';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { map, Observable } from 'rxjs';
import { IHomeState } from '../types/homeState.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { fetchHomeDataStart } from '../actions/home.actions';
import { getIsApiError, getIsApiLoading, homeEntites } from '../reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  entites$: Observable<IHomeState[]>;
  isLoading$: Observable<boolean | undefined>;
  apiError$: Observable<HttpErrorResponse | undefined>;
  
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

  carouselOptions: OwlOptions

  constructor(
    private store: Store<IHomeState>,
  ) {
    this.store.dispatch(fetchHomeDataStart());
    this.entites$ = this.store.pipe(select(homeEntites))
    this.isLoading$ = this.store.pipe(select(getIsApiLoading))
    this.apiError$ = this.store.pipe(select(getIsApiError))

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

    // this.isLoading$ = this.store.pipe(map((state: any) => !!state['home']))
    // console.log(this.isLoading$)
  }

  getSpecializationName(id: number) {
    return this.specializations.find((specialization) => specialization.id === id)?.name ?? '';
  }
}


