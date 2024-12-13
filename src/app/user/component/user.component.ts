import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctor, ISection, IService } from '../home/interfaces/home.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  sections: ISection[] = [];
  services: IService[] = [];
  doctors$!: Observable<IDoctor[]>
}
