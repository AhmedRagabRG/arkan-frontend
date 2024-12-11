import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { IDoctor } from '../home/interfaces/home.interface';

@Injectable()
export class AppointmentService {
  doctors: IDoctor[] = [];
  events: any[] = [];

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/doctor`).pipe(map((res) => {
      const doctors = Object.values(res);
      doctors.forEach((item: any) => {
        const days = JSON.parse(item.days);
        const dates = this.getNextFiveMonthsDates(days);
        this.events.push(
          ...dates.map((date: string) => ({
            title: item.name,
            date,
          }))
        );
      });
      return this.events;
    }));
  }

  getNextFiveMonthsDates(daysOfWeek: string[]): string[] {
    const result: string[] = [];
    const today = new Date();
    const nextFiveMonths = new Date(today.getFullYear(), today.getMonth() + 5, today.getDate());
    const dayIndices = daysOfWeek
      .map(day => ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        .indexOf(day.trim().toLowerCase())
      )
      .filter(index => index !== -1);

    if (dayIndices.length === 0) {
      console.warn("No valid days found in the input array.");
      return [];
    }
    for (let currentDate = new Date(today); currentDate <= nextFiveMonths; currentDate.setDate(currentDate.getDate() + 1)) {
      if (dayIndices.includes(currentDate.getDay())) {
        result.push(currentDate.toISOString().split('T')[0]);
      }
    }

    return result;
  }
}
