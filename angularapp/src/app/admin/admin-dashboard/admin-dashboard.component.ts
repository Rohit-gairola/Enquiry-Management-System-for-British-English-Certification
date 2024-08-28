import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  ViewPayment() {
    // window.location.href = '/AdminPayment';
    this.route.navigate(['/AdminPayment']);
  }
  ViewCourses() {
    this.route.navigate(['/AdminViewCourse']);
  }
  ViewEnquiry() {
    this.route.navigate(['/AdminViewEnquiry']);
  }
  AddCourse() {
    this.route.navigate(['/AdminAddCourse']);
  }
  ViewStudent() {
    this.route.navigate(['/viewStudent']);
  }

  constructor(private route: Router) { }

  ngOnInit() { }
}
