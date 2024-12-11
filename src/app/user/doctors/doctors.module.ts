import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SpeedDialModule } from 'primeng/speeddial';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DoctorsComponent } from './components/doctors.component';



@NgModule({
  declarations: [
    DoctorsComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    CarouselModule,
    SpeedDialModule,
    CarouselModule,
    
  ]
})
export class DoctorsModule { }
