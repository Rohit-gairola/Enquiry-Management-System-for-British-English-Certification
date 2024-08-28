import { Component, OnInit, DoCheck } from '@angular/core';

import { Router } from '@angular/router';
import { IdServiceService } from '../id-service.service';

@Component({

  selector: 'app-navbar',

  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.css']

})

export class NavbarComponent implements OnInit, DoCheck {

  role: string = '';
  username: string = '';

  constructor(private router: Router, private IdServiceService: IdServiceService) { }

  ngOnInit() {
    // Check for user role upon component initialization:

    // this.checkUserRole();

  }

  ngDoCheck() {

    // Optionally, recheck for role changes during app use:

    if (localStorage.getItem('userRole') !== this.role) {
      this.IdServiceService.setCourseId(null);
      this.checkUserRole();

    }

  }
clearEnq():any{
  this.IdServiceService.setCourseId(null);
}
  private checkUserRole() {
    this.role = localStorage.getItem('userRole');
    this.username = localStorage.getItem('username');

    // Handle potential absence of userRole:

    if (!this.role) {

      this.role = ''; // Set to an empty string or relevant default

    }

  }

  logout() {

    // Remove user data from local storage and navigate to login:

    localStorage.removeItem('userId');

    localStorage.removeItem('username');

    localStorage.removeItem('Email');

    localStorage.removeItem('userRole');
    // Clear user ID during logout
    localStorage.removeItem('studnetId');

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

    // this.toastService.showSuccess("Logged Out Successfully");
    // setTimeout(()=>{},3000)

  }

}
