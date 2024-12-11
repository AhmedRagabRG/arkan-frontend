import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    isLeftSidebarCollapsed = signal<boolean>(false);
    screenWidth = signal<number>(1920);

    constructor() {
    }

    ngOnInit(): void {
        this.isLeftSidebarCollapsed.set(false);
    }

    changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
        this.isLeftSidebarCollapsed.set(false);
    }
}
