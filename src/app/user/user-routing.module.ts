import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/components/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { UserComponent } from './component/user.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ContactComponent } from './contact/contact.component';


const userRoutes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'contactus', component: ContactComponent },
      { path: 'services/:id', component: ContactComponent },
      { path: 'sections/:id', component: ContactComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
