import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  @Input() sections: any[] | undefined;

  ngOnInit() {
    this.sections?.forEach((section) => {
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
          });
        }
      }
    });
  }
}
