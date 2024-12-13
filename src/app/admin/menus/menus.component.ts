import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../user/home/home.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html'
})
export class MenusComponent implements OnInit {
  sections: any[] = [];
 
  editSection(arg0: any) {
    throw new Error('Method not implemented.');
  }

  removeSection(arg0: any) {
    throw new Error('Method not implemented.');
  }
  
  openModal() {
    throw new Error('Method not implemented.');
  }
  
  constructor(
    private readonly homeService: HomeService,
    private readonly http: HttpClient
  ) 
  {}

  ngOnInit(): void {
    this.homeService.getHomeData().pipe(tap(data => {
      this.sections = Object.values(data.sections);
      console.log(this.sections);
    })).subscribe({
      error: (err) => {
        console.error('Error occurred while fetching data:', err);
      }
    });
  }
}
