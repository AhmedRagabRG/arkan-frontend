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
import { RouterModule } from '@angular/router';
import { TextSplicerPipe } from '../../common/pipes/text-splicer.pipe';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CarouselModule,
    CommonModule,
    ButtonModule,
    TagModule,
    SpeedDialModule,
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
