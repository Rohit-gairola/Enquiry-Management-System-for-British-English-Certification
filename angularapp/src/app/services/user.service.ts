import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from 'src/models/student.model';
import { User } from 'src/models/user.model';
import { Payment } from 'src/models/payment.model';
import { Course } from 'src/models/course.model';
 
 
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl = 'https://8080-caceefbcfcdcdfdceefaacdebdeecab.premiumproject.examly.io/api/student';

  constructor(private http: HttpClient) { }


  token:string=localStorage.getItem('token')
    httpOption={headers:new HttpHeaders({
      'Content-type':'application.json',
      'Authorization': `Bearer ${this.token}`
    })}

  //register user if student 
  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl,user,this.httpOption);
  }
  //get user and then filter accoring to role in frontend but doesnot give student id
  getUser(): any {
    return this.http.get<any>(`${this.apiUrl}s`,this.httpOption);
  }
  // Add a student
  addStudent(student: Student): Observable<any> {
    return this.http.post(this.apiUrl, student,this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Update a student
  updateStudent(id: number, student: Student): Observable<any> {
    return this.http.put(this.apiUrl + id, student,this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Delete a student
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id,this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Add a student payment
  addStudentPayment(payment: Payment): Observable<any> {
    return this.http.post(this.apiUrl + '/payment', payment,this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all students send student id for real this time
  getStudents(): Observable<any> {
    const params = new HttpParams().set('userId',localStorage.getItem('userId'));
    return this.http.get<any>(this.apiUrl,{params})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get student by user ID but it doesnot give studentID
  getStudentByUserId(userId: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + `/user/${userId}`,this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Get all enquiries
  getEnquiries(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + '/enquiry',this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Get enquiry by ID
  getEnquiryByAdmin(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + `/enquiry/${id}`,this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all courses herehere rohit use this
  getCourses(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl + '/course',this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Get course by ID
  getCourseById(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl + `/course/${id}`,this.httpOption)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  // Error handling
  private handleError(error: any) {
    // Handle errors as needed
    let errorMessage = 'Something went wrong. Please try again later.';
    console.error(error); // Log the error for debugging
    return throwError(() => new Error(errorMessage));
  }
}
 
 