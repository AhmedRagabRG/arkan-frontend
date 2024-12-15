import { Component } from '@angular/core';
import { IService } from '../home/interfaces/home.interface';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html'
})
export class ServiceComponent {
  serviceId: number | null = null;
  serviceData: any = null;
  services: IService[] = []

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.serviceId = id ? +id : null;
      this.store.subscribe((state: any) => {
        this.services = state['home'].services;
        this.serviceData = this.services.find(service => String(service.id) === String(this.serviceId));
        if (!this.serviceData) {
          console.error('Blog not found!');
        }
      });
    });
  }
}
