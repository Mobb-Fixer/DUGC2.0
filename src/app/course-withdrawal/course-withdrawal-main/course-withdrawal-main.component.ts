import { Component, OnInit } from '@angular/core';
import { WithdrawalNavbarComponent } from '../navbar/navbar.component';
import { AuthMainService } from 'src/app/auth-main.service';

@Component({
  selector: 'app-course-withdrawal-main',
  templateUrl: './course-withdrawal-main.component.html',
  styleUrls: ['./course-withdrawal-main.component.css'],
})
export class CourseWithdrawalMainComponent implements OnInit {
  constructor(private authService: AuthMainService) {}
  thisPage = '';
  userType: any = '';

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }
}
