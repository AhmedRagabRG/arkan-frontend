import { Component, OnInit } from '@angular/core';
import { IDoctor, ISpecialization } from '../home/interfaces/home.interface';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SpeedDialModule } from 'primeng/speeddial';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-doctors',
    standalone: true,
    imports: [
      CommonModule, CarouselModule, ButtonModule, TagModule, CarouselModule, SpeedDialModule, CarouselModule,
    ],
    templateUrl: './doctors.component.html',
})
export class DoctorsComponent implements OnInit {
  doctors: IDoctor[] = [];
  specializations: ISpecialization[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe((state: any) => {
      this.doctors = state['home'].doctors;
      this.specializations = state['home'].specializations;
    });
  }

  getSpecializationName(id: number) {
    return this.specializations.find((specialization) => specialization.id === id)?.name ?? '';
  }
}