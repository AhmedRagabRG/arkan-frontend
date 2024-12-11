import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsAdminComponent } from './doctors/doctors-admin.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctors', component: DoctorsAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
