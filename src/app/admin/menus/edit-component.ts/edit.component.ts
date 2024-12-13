import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-menus',
  templateUrl: './edit.component.html'
})
export class SectionnEditComponent implements OnInit {
  formGroup: any;

  constructor() {
    this.formGroup = new FormGroup({
      text: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }
}
