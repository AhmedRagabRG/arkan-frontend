import { Component, Input, Output } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Input() services: any[] | undefined = [];
}
