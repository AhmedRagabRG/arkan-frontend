import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IDoctor, IService, ISpecialization } from '../interfaces/home.interface';
import { HomeService } from '../home.service';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { fetchDoctorsSuccess, fetchServicesSuccess, fetchSpecializationsSuccess } from '../actions/home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  services: IService[] = [];
  specializations: ISpecialization[] = [];
  doctors: IDoctor[] = [];

  carouselOptions: OwlOptions

  constructor(
    private readonly homeService: HomeService,
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
      autoplay: false,
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
    this.homeService.getHomeData().pipe(tap(data => {
      const doctors = fetchDoctorsSuccess({doctors: data.doctors})
      const services = fetchServicesSuccess({services: data.services})
      const specializations = fetchSpecializationsSuccess({specializations: data.specializations})

      this.store.dispatch(doctors);
      this.store.dispatch(services);
      this.store.dispatch(specializations);
    })).subscribe({
      error: (err) => {
        console.error('Error occurred while fetching data:', err);
      }
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


