import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HomeService } from '../home.service';
import { fetchHomeDataError, fetchHomeDataStart, fetchHomeDataSuccess } from '../actions/home.actions';

@Injectable()
export class HomeEffects {

  constructor(
    private action$: Actions, // Ensure that Actions is injected here
    private homeService: HomeService
  ) {}

  fetchHomeData$ = createEffect(() => this.action$.pipe(
    ofType(fetchHomeDataStart),
    exhaustMap(() => {
      return this.homeService.getHomeData().pipe(
        map((response) => fetchHomeDataSuccess(response)),
        catchError((error) => of(fetchHomeDataError({ error })))
      );
    })
  ));
}
