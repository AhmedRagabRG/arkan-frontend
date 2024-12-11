import { CUSTOM_ELEMENTS_SCHEMA, isDevMode, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { HeaderComponent } from "./layout/header/header.component";
import { MenubarModule } from "primeng/menubar";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppointmentModule } from "./appointment/appointment.module";
import { FooterComponent } from "./layout/footer/footer.component";
import { TextSplicerPipe } from "./pipes/text-splicer.pipe";
import { AdminModule } from "./admin/admin.module";
import { DashboardRoutingModule } from "./admin/admin-routing.module";
import { AppRoutingModule } from "./app.routes";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HomeModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    AppointmentModule,
    AdminModule,
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    TextSplicerPipe,
    DashboardRoutingModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], 
  bootstrap: [AppComponent]
})
export class AppModule { }
