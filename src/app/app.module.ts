import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "./reducers";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NativeDateModule } from "@angular/material/core";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {}),
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserAnimationsModule,
    BrowserModule,
    NativeDateModule,
  ]
})
export class AppModule { }
