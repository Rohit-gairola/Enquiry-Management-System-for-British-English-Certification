import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { ToastService } from 'src/app/services/toast.service';
import { Course } from 'src/models/course.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
 
 
  onKeyDown(event: KeyboardEvent) {
    const key = event.key?.toLowerCase();
    if (key === 'e') {
      event.preventDefault();
    }
  }
  course: any = {
    // courseName: '',
    // description: '',
    // duration: '',
    // amount: 0
  }
  constructor(private route: Router,private toastService:ToastService ,private service: CourseService, private location: Location) { }
 
  ngOnInit(): void {
  }
  addCourse() {
    console.log(this.course);
    // console.log(form.value);
 
    this.service.addCourse(this.course)
      .subscribe(
        (response) => {
          console.log('Course added successfully:', response);
         // this.route.navigate(['/AdminViewCourse']); // Navigate to admin course view
        },
        (err) => console.log(err)
      );
      this.toastService.showSuccess("Course Added Successfully");
      setTimeout(()=>{
        this.route.navigate(['/AdminViewCourse']);
      },3000)

    // form.reset(); // Reset the form after successful submission
  }
  goBack(): void {
    this.location.back(); // Implement the goBack method
  }
 
}
 