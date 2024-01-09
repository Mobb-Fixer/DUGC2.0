import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadfileService {

  constructor(private http:HttpClient) { }

  downloadFile(){
    return this.http.get('http://localhost:3000/downloadfile',{
      responseType:'blob'
    })
  }
}
