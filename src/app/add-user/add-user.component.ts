import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  // constructor(
  //   // private dataService: DataService,
  //   // private toastr: ToastrService
  // ) {}

  // inp: any = {
  //   role: '',
  //   Username: '',
  //   email_id: '',
  //   Password: '',
  //   password: '',
  // };
  // Username: any = {};
  // email_id: any = {};
  // Password: any = {};
  // statusMessage = '';
  // onSubmit(): void {
  //   console.log("You've called the onclick function.");
  //   console.log(this.inp);
  //   // const temp_inp = (({ semester, course_code, course_name }) => ({ semester, course_code, course_name }))(this.inp);
  //   // this.dataService.AddUser(this.inp).subscribe(
  //   //   (resp) => {
  //   //     console.log(resp);
  //   //   },
  //   //   (error) => {
  //   //     console.log(error);
  //   //   }
  //   // );
  // }
  // validateDuplicate(): boolean {
  //   for (let i in this.Username) {
  //     if (this.inp.Username == this.Username[i]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // validateInput(): boolean {
  //   for (let i in this.inp) {
  //     if (this.inp[i] == ' ' || !this.inp[i]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // submitForm(): void {
  //   this.initializeUsers();

  //   if (!this.validateInput()) {
  //     this.statusMessage = 'ERROR: Invalid or missing field(s)';
  //     console.log(this.inp);
  //   } else if (this.validateDuplicate()) {
  //     this.statusMessage = 'ERROR: Username already exists';
  //    // this.toastr.error('Username error', 'Username already exist');
  //     console.log(this.inp);
  //   } else {
  //     this.statusMessage = '';
  //     this.onSubmit();
  //    // this.toastr.success('User added', this.inp.Username);
  //     this.initializeUsers();
  //   }
  // }
  // initializeUsers() {
  //   throw new Error('Method not implemented.');
  // }
  // // initializeNewUsers(): void {
  // //   this.dataService.getUsers().subscribe((resp) => {
  // //     this.Username = resp;
  // //     this.Username = this..course_file;
  // //     for (let [i, j] of Object.entries(this.courses)) {
  // //       for (let [k, l] of Object.entries(this.courses[i])) {
  // //         this.course_codes.push(`${k}`);
  // //       }
  // //     }
  // //     console.log('User initialized');
  // //   });
  // // }
  // resetForm(): void {
  //   this.inp = {
  //     role: 'faculty',
  //     Username: '',
  //     email_id: '',
  //     Password: '',
  //   };
  //   this.statusMessage = '';
  // }

  // ngOnInit(): void {
  //   this.initializeUsers();
  // }

}
