import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AuthMainService } from 'src/app/auth-main.service';

@Component({
  selector: 'app-labmain',
  templateUrl: './labmain.component.html',
  styleUrls: ['./labmain.component.css']
})
export class LabmainComponent implements OnInit {

  constructor(private authService: AuthMainService) {}
  thisPage = '';
  userType: any = '';
  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

}
