import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./component/dashboard.component";
import { LeftSidebarComponent } from "./layout/left-sidebar/left-sidebar.component";
import { DoctorsAdminComponent } from "./doctors/doctors-admin.component";
import { DoctorsAdminModalComponent } from "./doctors/modal/modal.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { DashboardHomeModule } from "./home/dashboard-home.module";
import { MenusComponent } from "./menus/menus.component";
import { SectionnEditComponent } from "./menus/edit-component.ts/edit.component";
import { EditorModule } from 'primeng/editor';
import { SectionsModalComponent } from "./menus/modal/modal.component";

@NgModule({
  declarations: [
    LeftSidebarComponent,
    DashboardComponent,
    DoctorsAdminComponent,
    DoctorsAdminModalComponent,
    MenusComponent,
    SectionnEditComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    DashboardHomeModule,
    EditorModule,
    SweetAlert2Module.forChild({})
  ]
})
export class AdminModule { }
