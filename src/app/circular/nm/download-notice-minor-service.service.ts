import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadNoticeMinorServiceService {

  constructor(private http: HttpClient) { }

  downloadNoticeMakeupCircular() {
    console.log("called service");
    return this.http.get('http://localhost:3000/noticeMakeupMinor', {
      responseType: 'blob'
    })
  }


  downloadMOMMakeupCircular() {
    console.log("called service");
    return this.http.get('http://localhost:3000/downloadMOM', {
      responseType: 'blob'
    })
  }
}
