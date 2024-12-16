import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './reducers';
import { HomeService } from './user/home/home.service';
import { IDoctor, ISection, IService, ISpecialization } from './user/home/interfaces/home.interface';
import { Observable, tap } from 'rxjs';
import { IHomeState } from './user/home/types/homeState.interface';
import { fetchHomeDataStart } from './user/home/actions/home.actions';
import { getIsApiError, getIsApiLoading, homeEntites, HomeState } from './user/home/reducers';
import { isLoading } from './user/home/reducers/api.reducer';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * The root component of the application.
 *
 * This component is responsible for rendering the main navigation
 * and the router outlet.
 *
 * The component is also responsible for subscribing to the
 * `isLoading` property of the store and rendering a loading
 * indicator if the value is `true`.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  entites$: Observable<any>;
  isLoading$: Observable<boolean | undefined>;
  apiError$: Observable<HttpErrorResponse | undefined>;
  
  constructor(
    private readonly homeService: HomeService,
    private store: Store<HomeState>,
  ) {
    this.store.dispatch(fetchHomeDataStart());
    this.entites$ = this.store.pipe(select(homeEntites))
    this.isLoading$ = this.store.pipe(select(getIsApiLoading))
    this.apiError$ = this.store.pipe(select(getIsApiError))
  }

  ngOnInit() {
  //   this.homeService.getHomeData().pipe(tap(data => {
  //     const doctors = fetchDoctorsSuccess({doctors: data.doctors})
  //     const services = fetchServicesSuccess({services: data.services})
  //     const specializations = fetchSpecializationsSuccess({specializations: data.specializations})
  //     const sections = fetchSectionsSuccess({sections: data.sections})

  //     this.services = data.services;
  //     this.specializations = data.specializations;
  //     this.doctors = data.doctors;
  //     this.sections = data.sections;
      
  //     this.store.dispatch(doctors);
  //     this.store.dispatch(services);
  //     this.store.dispatch(specializations);
  //     this.store.dispatch(sections);
      
  //   })).subscribe({
  //     error: (err) => {
  //       console.error('Error occurred while fetching data:', err);
  //     }
  //   });
  }

}
