import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {saveAs} from 'file-saver';
import { DownloadfileService } from './downloadfile.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
    title='downloadfile';
  constructor(private service:DownloadfileService,
    private router:Router) {}

  showLoginform: boolean = true;
  alert:boolean=false;
  onLoginClick() {
    
    // Perform any additional actions here (e.g., form validation)

    // Navigate to the main homepage component
    this.router.navigate(['/home']);
    this.showLoginform=false;
    this.alert=true;
  }

  ngOnInit(): void {
  }

  downloadFile(){
    this.service.downloadFile().subscribe((data:Blob | MediaSource)=>{
      let downloadURL=window.URL.createObjectURL(data)
      saveAs(downloadURL)
    })
  }

 

}
