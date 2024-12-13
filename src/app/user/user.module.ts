import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { AppointmentModule } from './appointment/appointment.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { TextSplicerPipe } from '../common/pipes/text-splicer.pipe';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './component/user.component';
import { HomeModule } from './home/home.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    AppointmentModule,
    TextSplicerPipe,
    BreadcrumbModule,
    HomeModule
  ]
})
export class UserModule { }
