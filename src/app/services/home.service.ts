import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getHomeData(): Observable<any> {
    const request1 = this.http.get(`${this._apiUrl}/doctor`).pipe(catchError(() => of([])));
    const request2 = this.http.get(`${this._apiUrl}/specialization`).pipe(catchError(() => of([])));
    const request3 = this.http.get(`${this._apiUrl}/service`).pipe(catchError(() => of([])));
    const request4 = this.http.get(`${this._apiUrl}/section`).pipe(catchError(() => of([])));
  
    return forkJoin([request1, request2, request3, request4]).pipe(
      map(([doctors, specializations, services, sections]) => ({
        doctors: Object.values(doctors),
        specializations: Object.values(specializations),
        services: Object.values(services),
        sections: Object.values(sections),
      }))
    );
  }
  
}
