import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IdServiceService } from '../id-service.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {
    //username: '',
    email: '',
    password: '',

  };
 
  userNotFound: boolean;
  response: any = {}

  constructor(private IdServiceService: IdServiceService, private authservice: AuthService, private userservice: UserService, private router: Router, private toastSerivce: ToastService) { }

  ngOnInit() { }
 
  onSubmit(form: NgForm): any {
    console.log("form value ", form.value);
    console.log("user from 2 way binding ", this.user);
 
    this.authservice.login(this.user).subscribe(data => {
      this.response = data;
      this.saveResponse();
      if (localStorage.getItem('userRole') == "Admin") { this.router.navigate(['/adminDashboard']); }
      if (localStorage.getItem('userRole') == "Student") {
        this.userservice.getStudents().subscribe(
          (data) => {
            // if (data && data.length > 0) {
            const studentId = data.studentId; // Assuming studentId is a number
            localStorage.setItem('studentId', studentId.toString());
            console.log('Student ID stored in localStorage:', studentId);
          }
        );
        this.router.navigate(['/studentDashboard']);
      }
      this.toastSerivce.showSuccess("Successfully Logged In")
    },
    
      (error) => {
        if (error.status === 400 || error.status === 404) {
          this.userNotFound = true;
          console.log("user not found");
        }
      })
  }
 
  saveResponse(): void {
    localStorage.setItem("userId", this.response.userId.toString());
    localStorage.setItem("username", this.response.username);
    localStorage.setItem("Email", this.response.email);
    localStorage.setItem("userRole", this.response.userRole);
    localStorage.setItem("token", this.response.token);
  }
 
}
 
 
 
 
 
 
 
 
 