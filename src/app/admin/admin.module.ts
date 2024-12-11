import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainComponent } from "./main/main.component";
import { LeftSidebarComponent } from "./left-sidebar/left-sidebar.component";
import { DoctorsAdminComponent } from "./doctors/doctors-admin.component";
import { DoctorsAdminModalComponent } from "./main/modal/modal.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";



@NgModule({
  declarations: [
    MainComponent,
    LeftSidebarComponent,
    DashboardComponent,
    DoctorsAdminComponent,
    DoctorsAdminModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardRoutingModule,
    MatDialogModule, 
    MatButtonModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild({})
  ]
})
export class AdminModule { }
