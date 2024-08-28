import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/models/course.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css'],
})
export class ViewCourseComponent implements OnInit {
  courses: any = [];
  course: Course = {
    courseName: '',
    description: '',
    duration: '',
    amount: 0,
  };
  newcourse: any = {
    courseName: '',
    description: '',
    duration: '',
    amount: 0,
  };
  selectedCourse: any = {}; // store the selected course for editing or deletion
  editCourseId: any = 0;
  showAddCourse: boolean = false;
  showEditDiv: boolean = false; // track edit modal visibility
  deleteToggle: boolean = false;

  constructor(private courseservice: CourseService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseservice.getAllCourses().subscribe((data => { this.courses = data; console.log(data) }));
    this.toastService.showSuccess("Courses");
    setTimeout(()=>{},3000)
  }

  onKeyDown(event: KeyboardEvent): any {
    if (event.key.toLowerCase() === 'e') event.preventDefault();
  }
  toggleAdd(button: any): void {
    console.log(button);

    this.showAddCourse = !this.showAddCourse;
    button.textContent = this.showAddCourse ? 'Back to Course List' : 'Add Course';
    button.classList.toggle('btn-success');
    button.classList.toggle('btn-primary');
  }

  showConfirmDelete(course?: any): void {
    console.log(course.courseID);

    this.selectedCourse = course;
    this.deleteToggle = !this.deleteToggle;
  }

  deleteCourse(course: any): void {
    // Replace with your actual deletion logic (e.g., calling a service)
    this.courseservice.deleteCourse(course.courseID).subscribe(
      (response) => {
        console.log("here for a moment", response);
        this.getAllCourses();
      }, (error) => {
        if (error.status == 200) { this.getAllCourses(); }
        console.log("error", error);
      }
    );
    this.deleteToggle = false;

  }

  openEditModal(course: Course): void {
    this.selectedCourse = course; // Pass the course object
    this.showEditDiv = true;
  }
  // closeEditModal(): void {
  //   this.getAllCourses();
  //   this.showEditDiv = false;
  // }
  toggleShowEditDiv(course: any): void {
    this.showEditDiv = true;
    this.newcourse = course;
    this.editCourseId = course.courseID;
    this.getAllCourses();
    console.log("course id ", this.editCourseId);
  }

  editCourse() {

    console.log(this.editCourseId);
    console.log(this.newcourse.courseName);
    console.log(this.newcourse.description);
    console.log(this.newcourse.duration);
    console.log(this.newcourse.amount);

    this.courseservice.updateCourse(this.editCourseId, this.newcourse).subscribe(
      (response) => {
        console.log('Course updated successfully:', response);
        // Optional: Clear form fields after successful update
        this.getAllCourses();
        this.showEditDiv = false; // Close edit modal
      },
      (error) => {
        console.error('Error updating course:', error);
        // Handle errors appropriately, e.g., show error message
      }
      );
      this.toastService.showSuccess("Course Updated");
      setTimeout(()=>{},3000)
  }
}

