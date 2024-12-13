import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  getHomeData(): Observable<any> {
    const request1 = this.http.get(`${environment.baseUrl}/doctor`).pipe(catchError(() => of([])));
    const request2 = this.http.get(`${environment.baseUrl}/specialization`).pipe(catchError(() => of([])));
    const request3 = this.http.get(`${environment.baseUrl}/service`).pipe(catchError(() => of([])));
    const request4 = this.http.get(`${environment.baseUrl}/section`).pipe(catchError(() => of([])));
    
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
