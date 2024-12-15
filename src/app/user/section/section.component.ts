import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISection } from '../home/interfaces/home.interface';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html'
})
export class SectionComponent {
  sectionId: number | null = null;
  sectionData: any = null;
  sections: ISection[] = []

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.sectionId = id ? +id : null;
      this.store.subscribe((state: any) => {
        this.sections = state['home'].sections;
        this.sectionData = this.sections.find(section => String(section.id) === String(this.sectionId));
        if (!this.sectionData) {
          console.error('Blog not found!');
        }
      });
    });
  }
}
