import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  viewCourses() {
    this.route.navigate(["/studentViewCourses"]);
  }
  addEnquiry() {
    this.route.navigate(["/studentAddEnquiry"]);
  }

  viewEnquiries() {
    this.route.navigate(["/studentViewEnquiries"]);
  }

}
