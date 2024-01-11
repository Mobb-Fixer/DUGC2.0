import { Component, OnInit } from '@angular/core';
import { AuthMainService } from 'src/app/auth-main.service';


@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.css']
})
export class EligibilityComponent implements OnInit {

  constructor(private authService: AuthMainService) {}
  thisPage = '';
  userType: any = '';
  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

}
