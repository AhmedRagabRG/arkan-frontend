import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/partial/header/header.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./components/partial/footer/footer.component";
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  sections: any[] = [];
  
  constructor(private readonly homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        this.sections = data.sections;
      },
      error: (err) => {
        console.error('Error occurred while fetching data:', err);
      },
    });
  }
}
