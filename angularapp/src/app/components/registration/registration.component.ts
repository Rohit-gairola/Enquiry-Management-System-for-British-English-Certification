import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'src/models/user.model';
 
 
@Component({
 
  selector: 'app-register',
 
  templateUrl: './registration.component.html',
 
  styleUrls: ['./registration.component.css']
 
})
 
export class RegistrationComponent  {
 
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  mobileNumber: string = "";
  role: string = "";
  email: string = '';
 
  passwordMismatch: boolean = false; // New property to track password mismatch
 
  error: string = '';
  constructor(private authService: AuthService, private router: Router) { }
 
  model: any = {}
 
  confirmpassword: string = ''
 
  errorMessage: string = ''
 
  ngOnInit(): void {
 
  }
 
  register(): void {
 
    if (this.password !== this.confirmPassword) {
 
      this.passwordMismatch = true;
 
      return;
 
    }
 
    this.passwordMismatch = false;
 
    if (!this.isPasswordComplex(this.password)) {
 
      return; // Password complexity check failed
 
    }
 
    const user: User = {
      userId: 0,
      userName: '',
      emailID: '',
      password: ''
    }
 
    this.authService.register(user).subscribe(
 
      (user) => {
 
        console.log(user);
 
        console.log(this.role)
 
         if (user == true && this.role === 'Admin') {
 
          this.router.navigate(['/login']);
 
         } else if ( user == true && this.role === 'Student') {
 
          this.router.navigate(['/login']);
 
         }else if ( user == true && this.role === 'Officestaff') {
 
           this.router.navigate(['/login']);
 
        }
 
      },
 
      (error) => {
 
        console.log(error.error.Message);
 
        this.error = error.error.Message;
 
        // Handle registration error, display a message, etc.
 
      }
 
    );
 
  }
 
  isPasswordComplex(password: string): boolean {
 
    const hasUppercase = /[A-Z]/.test(password);
 
    const hasLowercase = /[a-z]/.test(password);
 
    const hasDigit = /\d/.test(password);
 
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password);
 
    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
 
  }
 
}