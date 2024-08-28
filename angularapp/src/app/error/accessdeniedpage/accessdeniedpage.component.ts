import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-accessdeniedpage',
  templateUrl: './accessdeniedpage.component.html',
  styleUrls: ['./accessdeniedpage.component.css']
})
export class AccessdeniedpageComponent implements OnInit {
 
  role:string = ''
  constructor() {
    this.role = localStorage.getItem('userRole')
  }
  ngOnInit(): void {
    console.log(this.role);  
    this.role = localStorage.getItem('userRole')
  }
}
 