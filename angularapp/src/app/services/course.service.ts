import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/models/course.model';
import { Payment } from 'src/models/payment.model';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  public apiUrl = 'https://8080-caceefbcfcdcdfdceefaacdebdeecab.premiumproject.examly.io';
 
  token:string=localStorage.getItem('token')
    httpOption={headers:new HttpHeaders({
      'Content-type':'application.json',
      'Authorization': `Bearer ${this.token}`
    })}
   
/*     constructor(private http: HttpClient, private router: Router)
    {
      const t = localStorage.getItem('token')
      if(t!=null){
        this.token=t
      }
      else{
        this.router.navigate(['/login'])
      }
    } */
    constructor(private http:HttpClient){}
  // Get all courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/api/course`, this.httpOption);
  }
  getStudentCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/api/student/course`, this.httpOption);
  }
 
  // Get a course by ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`,this.httpOption);
  }
 
  // Add a new course
  addCourse(course: Course): Observable<any> {
    return this.http.post(this.apiUrl, course,this.httpOption);
  }
  saveCourseByAdmin(course: Course): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/course`, course,this.httpOption);
  }
 
  // Update a course
  updateCourse(id: number, course: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course,this.httpOption);
  }
  updateCourseByAdmin(id: number, course: Course): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/course/${id}`, course,this.httpOption);
  }
 
  // Delete a course
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,this.httpOption);
  }
  deleteCourseByAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/course/${id}`,this.httpOption);
  }
 
  getPaymentsByCourseId(courseId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}?courseId=${courseId}`,this.httpOption);
  }
 
 
}
 