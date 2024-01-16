import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-na',
  templateUrl: './na.component.html',
  styleUrls: ['./na.component.css']
})
export class NaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // onSubmit1(): void {
  //   console.log("You've called the onclick function.");
  //   this.submitted = true;
  
  //   // Check if a file is selected and upload it
  //   if (this.inp2.filename) {
  //     this.dataService.uploadEmail11(this.inp2.filename).subscribe(
  //       (fileResp) => {
  //         console.log('File uploaded successfully:', fileResp);
  //         this.toast.success('File uploaded successfully');
  
  //         // If the file upload is successful, proceed to upload sheets
  //         this.dataService.uploadEmail(this.inp2).subscribe(
  //           (sheetsResp) => {
  //             console.log('Sheets uploaded successfully:', sheetsResp);
  //             this.toast.success('Sheets uploaded successfully');
  //           },
  //           (sheetsError) => {
  //             console.log('Error uploading sheets:', sheetsError);
  //             this.toast.error('Error uploading sheets');
  
  //             // Handle error uploading sheets
  //           }
  //         );
  //       },
  //       (fileError) => {
  //         console.log('Error uploading file:', fileError);
  //         this.toast.error('Error uploading file');
  
          
  //         // Handle error uploading file
  //       }
  //     );
  //   } else {
  
  //     this.toast.error('Please select a file first');
  //   }
  // }

}
