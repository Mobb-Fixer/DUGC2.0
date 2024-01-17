import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadMakeupCircularService {

  constructor(private http:HttpClient) { }
  

  downloadMakeupCircular() {
    return this.http.get('http://localhost:3000/downloadMakeMinorCircular', {
      responseType:'blob'
    })
  }
}
