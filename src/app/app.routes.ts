import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DoctorsComponent } from './components/pages/doctors/doctors.component';
import { AppointmentComponent } from './components/pages/appointment/appointment.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
