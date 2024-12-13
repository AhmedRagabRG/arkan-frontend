import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  
  items = [
    {
      routeLink: 'admin/home',
      icon: 'fal fa-home',
      label: 'Dashboard',
    },
    {
      routeLink: 'admin/doctors',
      icon: 'fal fa-box-open',
      label: 'Doctors',
    },
   
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
