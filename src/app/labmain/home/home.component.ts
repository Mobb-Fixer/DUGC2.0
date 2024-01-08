import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  year: string = '';
  Sem: string = '';
  Div: string = '';

  ngOnInit(): void {}

  myFun() {
    if (this.year == '2021'|| this.year == '2020') {
      this.pr.navigate(['/Labmain/upload']);
    }
    else if (this.Sem == '8') this.pr.navigate(['/Labmain/sem8']);
    else if (this.year == '2022') this.pr.navigate(['/Labmain/upload']);
    else {
      this.pr.navigate(['/Labmain/home']);
    }
  }
  constructor(private pr: Router) {}
}
