import { Component, enableProdMode, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  excelData: any;
  chartLabels: string[] = [];
  chartData: number[] = [];

  willDownload = false;
  showToaster: boolean = false;
  toasterMessage: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      this.chartLabels = this.excelData.map((data: any) => data.Grades);
      this.chartData = this.excelData.map((data: any) => data.Count);

      var myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: 'Number of students',
              data: this.chartData,
              backgroundColor: '#68aeff',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    };
  }

  submit:boolean=false;
  submitFile() {
    if (this.excelData && this.excelData.length > 0) {
      console.log(this.excelData)
      setTimeout(() => {
        this.showToaster = true;
        this.toastr.success('File uploaded successfully!');
      }, 1000);

      console.log('Uploaded Data:', this.excelData);
    } else {
      this.showToaster = true;
      this.toastr.error('Error uploading file. Please select a file.');
    }
    this.submit=true;
  }
}