import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  homePage(): any {
    const role = localStorage.getItem("userRole");

    if (role === "Admin") {
      this.route.navigate(['/adminHomePage'])
    }
    if (role === "Student") {
      this.route.navigate(['/studentHomePage'])
    }
    if (role === null) this.route.navigate(['/login'])
  }

}
