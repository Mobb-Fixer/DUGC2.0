import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private apiUrl = 'http://localhost:3000/send-message';  // Adjust the API endpoint if needed

  constructor(private http: HttpClient) { }

  sendMessage(formData: any): Observable<any> {
    const{name,email,message}=formData;
    return this.http.post(this.apiUrl, formData);
  }
}
