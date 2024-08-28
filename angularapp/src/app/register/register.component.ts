import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user:any = {
    // userId: 0,
    // userName: '',
    // emailID: '',
    // password: '',
    // mobileNumber: 0,
    // userRole: ''
  };
  errormsg: boolean = false;


  constructor(private authservice: AuthService, private userservice: UserService, private route: Router, private toastService: ToastService) { }

  confirmPassword: string = '';


  roles: any = ['Admin', 'Student'];

  onSubmit(Form: NgForm) {
    if (this.user.userRole == "Admin") {
      this.authservice.register(this.user).subscribe(() => {

        console.log(Form);
        console.log(Form.controls['password'].valid);
        console.log(Form.controls['password'].errors);
        console.log('Form submitted successfully!');
        this.route.navigate(['/login'])
      }, (error) => {
        this.errormsg = true;
      }
      );
    }
    if (this.user.userRole == "Student") {
      const student = {
        studentId: 0,
        studentName: this.user.userName,
        studentMobileNumber: this.user.mobileNumber,
        enquiryCount: 5,
        user: {
          userId: 0,
          userName: this.user.userName,
          emailID: this.user.emailID,
          password: this.user.password,
          mobileNumber: this.user.mobileNumber,
          userRole: 'Student'
        }
      }
      console.log("new Student ", student);
      this.userservice.register(student).subscribe(
        (response) => {
          console.log(response);
        }, (error) => {
          if (error.status == 400 || error.status == 409)
            console.log(error);
          this.errormsg = true;
        }
      )
      this.toastService.showSuccess("Student Registered Successfully");
      setTimeout(()=>{},3000)
      this.route.navigate(['/login'])
      this.resetForm(Form);
    }
  }
  resetForm(Form: NgForm): any {
    this.errormsg = false;
    Form.reset();
  }
}



