import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { EnquiryService } from 'src/app/services/enquiry.service';

import { Location } from '@angular/common';
import { IdServiceService } from 'src/app/id-service.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-add-enquiry',
  templateUrl: './student-add-enquiry.component.html',
  styleUrls: ['./student-add-enquiry.component.css']
})
export class StudentAddEnquiryComponent implements OnInit {
  courses: any = [];
  enquiries: any = ["Doubt", "Complaint", "Course Detail"];
  selectedCourse: string = '';
  selectedEnquiry: any = "";
  enquiry: any = {
    enquiryDate: new Date(),
    userId: Number(localStorage.getItem('userId')),
    title: "Test enquiry",
    description: "",
    emailID: localStorage.getItem('Email'),
    enquiryType: '',
    courseID: '',
    StudentId: Number(localStorage.getItem('userId'))
  }
  errormsg: any = null;
  

  // tmp:any[];


  constructor(private toastService:ToastService,private IdServiceService: IdServiceService, private courseService: CourseService, private enquiryService: EnquiryService, private userService: UserService, private route: Router, private location: Location) { }

  ngOnInit() {
    this.getCourses();
  }
  getCourses(): any {
    if (this.IdServiceService.getCourseId() != null || this.IdServiceService.getCourseId() != '') this.enquiry.courseID = this.IdServiceService.getCourseId();
    console.log(this.enquiry.courseID);
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
        const tmp = this.courses.find(course => course.courseID === this.enquiry.courseID);
        this.selectedCourse = tmp?.courseName;
      }
    );
  }
  onSubmit(form): any {
    console.log("form", form.value);
    console.log("object object", this.selectedCourse);
    this.enquiryService.addEnquiry(this.enquiry).subscribe(
      (response) => {
        console.log(response);
        /* storing Enquiry id in service */
        this.IdServiceService.setEnquiryId(response.enquiryID)

        var studentID = Number(localStorage.getItem('studentId'));

        this.userService.getCourses().subscribe( //ar work here
          (data) => {
            this.courses = data;
            console.log("daata", data);

            const tmp = this.courses.find(s => s.studentId == Number(studentID));
            // this.selectedCourse = tmp.courseName;
            console.log("length check", tmp);

            const enrolledcourse = tmp.courses.find((course) => course.courseID === response.courseID);

            console.log("rohit stuff", tmp.courses);
            console.log("enrolledcourse is null or not", enrolledcourse);

            if (!enrolledcourse) {
              this.route.navigate(['/addpayment']);
              // this.IdServiceService.setCourseId(null);
            } else {
              this.route.navigate(['/studentViewEnquiries']);
              this.IdServiceService.setCourseId(null);
            }
          }
        );

        //this.route.navigate(['/addpayment']);

      },
      (error) => {
        // Handle errors 
        if (error.status == 400) {
          this.errormsg = error.error;
        }
      }

    )
    this.toastService.showSuccess("Enquiry Added Successfully");
    setTimeout(()=>{},3000)
  }
  goBack(event: Event) {
    event.preventDefault();
    this.IdServiceService.setCourseId(null);
    this.location.back();
  }

}



// enq have course id so use course id to check student id in coursestudents table from courseStudents
// use enq id and course id from enq and return student id
