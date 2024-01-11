import { Component, OnInit } from '@angular/core';
import { AnalysisComponent } from '../analysis/analysis.component';
import { AuthMainService } from 'src/app/auth-main.service';

@Component({
  selector: 'app-endsem-analysis-main',
  templateUrl: './endsem-analysis-main.component.html',
  styleUrls: ['./endsem-analysis-main.component.css'],
})
export class EndsemAnalysisMainComponent implements OnInit {
  constructor(private authService: AuthMainService) {}
  thisPage = '';
  userType: any = '';
  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }
}
