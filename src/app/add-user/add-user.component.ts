import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthMainService } from '../auth-main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private auth: AuthMainService,
    private router: Router,
    private toast: ToastrService
  ) {}

  addUserData = {
    role: '',
    username: '',
    email: '',
    password: '',
  };

  ngOnInit(): void {}

  addUser(e: any) {
    console.log(this.addUserData);

    this.auth.AddUser(this.addUserData).subscribe(
      (res) => {
        console.log(res);
        this.toast.success('User Added Successfully');
        this.router.navigate(['/Minor']);
      },
      (err) => {
        console.error('console', err); // Log the entire error object for debugging
        console.log(err.error.message);
        this.toast.error(
          err.error.message || 'An error occurred during login.'
        );
      }
    );
  }
}
