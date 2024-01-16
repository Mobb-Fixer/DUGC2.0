import { Component, OnInit } from '@angular/core';
import { AuthMainService } from 'src/app/auth-main.service';

@Component({
  selector: 'app-minor-main',
  templateUrl: './minor-main.component.html',
  styleUrls: ['./minor-main.component.css']
})
export class MinorMainComponent implements OnInit {
  constructor(private authService: AuthMainService) {}
  thisPage = '';
  userType: any = '';

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

}