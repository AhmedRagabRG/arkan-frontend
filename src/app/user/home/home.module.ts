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
import { RouterModule } from '@angular/router';
import { TextSplicerPipe } from '../../common/pipes/text-splicer.pipe';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './effects/home.effects';


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
    StoreModule.forFeature('home', reducers),
    EffectsModule.forFeature([HomeEffects]),
    TextSplicerPipe,
    RouterModule,
  ],
  providers: [
    HomeService,
    provideHttpClient(withFetch())
  ],
  
})
export class HomeModule { }
