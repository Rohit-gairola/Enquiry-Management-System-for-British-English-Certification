import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { IdServiceService } from 'src/app/id-service.service';

@Component({
  selector: 'app-student-view-courses',
  templateUrl: './student-view-courses.component.html',
  styleUrls: ['./student-view-courses.component.css']
})
export class StudentViewCoursesComponent implements OnInit {
  courses: any[];
  enrolledcourses: any[]
  filteredCourses:any[]

  constructor(private userservice: UserService, private courseService: CourseService, private location: Location, private IdServiceService: IdServiceService) { }

  ngOnInit(): void {
    this.viewCourses();
  }
  selectCourse(courseID, event: Event): any {
    this.IdServiceService.setCourseId(courseID);
    event.preventDefault();
  }
  viewCourses() {
    // Fetch all courses
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log('All courses:', this.courses);
        this.userservice.getCourses().subscribe(
          (data) => {
            console.log(data);
            // var studentId = this.IdServiceService.getStudentId();
            var studentId = localStorage.getItem('studentId');
            // var studentId = 1;
            console.log(studentId);

            var student = data.find(s => s.studentId == Number(studentId))
            console.log("selected student data ", student);
            this.enrolledcourses = student.courses;
            console.log("all courses ", this.courses);

            console.log("enrolled course", this.enrolledcourses);
            // Assuming Courses and enrolledCourses are arrays of objects
            this.filteredCourses = this.courses.filter(course => !this.enrolledcourses.some(enrolledCourse => enrolledCourse.courseID === course.courseID));
            console.log("filteredCourses ",this.filteredCourses);
            
          }
        );
      }
    );
  }



  appPayment: boolean = false;
  goBack(): void {
    this.location.back(); // Implement the goBack method
  }

}
