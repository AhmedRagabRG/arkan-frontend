import { Component, HostListener, OnInit, signal } from '@angular/core';
import { HomeService } from './home/home.service';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { map, Observable } from 'rxjs';
import { stat } from 'fs';
import { IDoctor } from './home/interfaces/home.interface';

/**
 * The root component of the application.
 *
 * This component is responsible for rendering the main navigation
 * and the router outlet.
 *
 * The component is also responsible for subscribing to the
 * `isLoading` property of the store and rendering a loading
 * indicator if the value is `true`.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  sections: any[] = [];
  services: any[] = [];
  doctors$!: Observable<IDoctor[]>

  constructor(private store: Store<AppState>) { }
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(1920);

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(false);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(false);
  }
}
