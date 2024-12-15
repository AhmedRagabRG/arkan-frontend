import { Component, Input, OnInit } from '@angular/core';
import { IService } from '../../home/interfaces/home.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    services: IService[] = [];

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.store.subscribe((state: any) => {
            this.services = state['home'].services
        });
    }
}
