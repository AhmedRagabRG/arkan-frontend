import { MenuItem } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { ISection } from '../../home/interfaces/home.interface';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'الصفحة الرئيسية',
      route: '/home',
    },
    {
      label: 'الأطباء',
      route: '/doctors',
    },
    {
      label: 'تواصل معنا',
      route: '/contactus',
    },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe((state: any) => {
      state['home'].sections?.forEach((section: ISection) => {
        if (!section.sectionId) {
          this.items.push({
            id: section.id,
            label: section.name,
          });
        } else {
          const parentItem = this.items.find(item => item.id === section.sectionId);
          if (parentItem) {
            parentItem.items = parentItem.items || [];
            parentItem.items.push({
              id: section.id,
              label: section.name,
              route: `/sections/${section.id}`,
            });
          }
        }
      });
    });

  }
}
