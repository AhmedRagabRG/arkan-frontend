import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SpeedDialModule } from 'primeng/speeddial';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeComponent } from './components/home.component';
import { HomeService } from './home.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './reducers';
import { TextSplicerPipe } from '../pipes/text-splicer.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    CarouselModule,
    SpeedDialModule,
    CarouselModule,
    StoreModule.forFeature('home', homeReducer),
    TextSplicerPipe,
    RouterModule,
  ],
  providers: [
    HomeService,
    provideHttpClient(withFetch())
  ],
  
})
export class HomeModule { }
