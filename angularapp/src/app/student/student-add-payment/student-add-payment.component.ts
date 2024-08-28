import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Payment } from 'src/models/payment.model';
import { Location } from '@angular/common';
import { IdServiceService } from 'src/app/id-service.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-add-payment',
  templateUrl: './student-add-payment.component.html',
  styleUrls: ['./student-add-payment.component.css']
})
export class StudentAddPaymentComponent implements OnInit {

  // form
  payment: any = {
    userName: localStorage.getItem("username"),
    amount: 0,
    paymentMode: '',
    paymentDate: new Date(),
  }
  constructor(private IdServiceService: IdServiceService, private courseService: CourseService, private userservice: UserService, private router: Router, private location: Location) {
    if (this.courseID != null) {
      this.courseService.getCourseById(this.courseID).subscribe(
        (data) => {
          this.payment.amount = data.amount;
        }
      )
    }
  }


  paymentOptions: any = ["UPI", "Banking", "Debit card", "Credit card"]
  userId = localStorage.getItem('userId');
  courseID: any = this.IdServiceService.getCourseId();
  course: any = {}
  ngOnInit(): void {
    if (this.courseID != null) {
      this.courseService.getCourseById(this.courseID).subscribe(
        (data) => {
          this.payment.amount = data.amount;
        }
      )
    }
  }


  submitPayment(form: NgForm) {
    // console.log("psuh payment " ,this.pushPayment);
    console.log("form ", form.value);
    console.log("ng data ", this.payment);
    const pushPayment: any = {
      enquiryID: this.IdServiceService.getEnquiryId(),
      userId: Number(this.userId),
      amountPaid: this.payment.amount,
      modeOfPayment: this.payment.paymentMode,
      paymentDate: this.payment.paymentDate
    }
    this.userservice.addStudentPayment(pushPayment).subscribe((response => {
      console.log(response);
      this.router.navigate(['/studentViewCourses']);
    }))
    // this.courseService.
  }
  goBack(): void {
    // this.location.back(); // Implement the goBack method
    this.router.navigate(['/studentViewCourses']); // Implement the goBack method
  }

}
