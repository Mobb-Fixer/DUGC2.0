import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthMainService } from 'src/app/auth-main.service';

@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.component.html',
  styleUrls: ['./confirm-pass.component.css']
})
export class ConfirmPassComponent implements OnInit {
  constructor(
    private auth: AuthMainService,
    private router: Router,
    private toast: ToastrService
  ) {}

  confirmPassData = {
    token: '',
    email: '',
    password: '',
    confirmpassword: ''
  };

  ngOnInit(): void {}

  confirmPassword(e: any) {
    console.log(this.confirmPassData);

    this.auth.ChangePassword(this.confirmPassData).subscribe(
      (res) => {
        console.log(res);
        this.toast.success('Password changed successfully');
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
