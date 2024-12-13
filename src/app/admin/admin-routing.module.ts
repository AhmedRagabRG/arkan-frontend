import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './component/dashboard.component';
import { DoctorsAdminComponent } from './doctors/doctors-admin.component';
import { DashboardHomeComponent } from './home/components/dashboard-home.component';
import { MenusComponent } from './menus/menus.component';
import { SectionnEditComponent } from './menus/edit-component.ts/edit.component';


const adminRoutes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'home', component: DashboardHomeComponent },
      { path: 'sections', component: MenusComponent },
      { path: 'sections/:id', component: SectionnEditComponent },
      { path: 'doctors', component: DoctorsAdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
