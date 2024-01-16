// your-email.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YourEmailService {
  constructor(private http: HttpClient) {}

  sendEmail(email: string, message: string, attachment: File | null) {
    // Create a FormData object to handle file attachments
    const formData: FormData = new FormData();

    // Append email and message data to FormData
    formData.append('email', email);
    formData.append('message', message);

    // Append the file if it is provided
    if (attachment) {
      formData.append('attachment', attachment, attachment.name);
    }

    // Set headers for multipart form data
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    // Send the email with attachment to the backend service
    this.http.post('your-backend-url/send-email', formData, { headers }).subscribe(
      (response: any) => {
        console.log('Email sent successfully', response);
        // Handle success, if needed
      },
      (error: any) => {
        console.error('Error sending email', error);
        // Handle error, show error message to the user
      }
    );
  }
}
