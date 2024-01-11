import { Component, OnInit } from '@angular/core';
import { AuthMainService } from 'src/app/auth-main.service';


@Component({
  selector: 'app-circular-main',
  templateUrl: './circular-main.component.html',
  styleUrls: ['./circular-main.component.css']
})
export class CircularMainComponent implements OnInit {

  constructor(private authService: AuthMainService) {}
  thisPage = '';
  userType: any = '';
  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

}
