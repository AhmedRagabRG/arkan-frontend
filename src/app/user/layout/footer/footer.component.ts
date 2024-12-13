import { Component, Input } from '@angular/core';
import { IService } from '../../home/interfaces/home.interface';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Input() services: IService[] | undefined = [];
}
