import { Component, OnInit } from '@angular/core';
import { GetAnalysisService } from '../get-analysis.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js/auto';
import { DxChartModule } from 'devextreme-angular';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
