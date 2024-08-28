import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enquiry } from 'src/models/enquiry.model';
@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
 
  public apiUrl = "https://8080-caceefbcfcdcdfdceefaacdebdeecab.premiumproject.examly.io";
 
  constructor(private http: HttpClient) { }
 
  token:string=localStorage.getItem('token')
    httpOption={headers:new HttpHeaders({
      'Content-type':'application.json',
      'Authorization': `Bearer ${this.token}`
    })}
  // Get all enquiries by admin
  getAllEnquiriesByAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/enquiry`,this.httpOption);
  }
  // Get all enquiries test changes
  getEnquiriesByUser(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/user/${id}`,this.httpOption);
  }
  getAllPayment():any{
    return this.http.get<any>(`${this.apiUrl}/api/payment`,this.httpOption);
  }
 
  // Get enquiry by ID test changes
  getEnquiryByAdmin(id: number): Observable<Enquiry> {
    return this.http.get<Enquiry>(`${this.apiUrl}/api/enquiry/${id}`,this.httpOption);
  }
 
 
  // Add a new enquiry
  addEnquiry(enquiry: Enquiry): Observable<Enquiry> {
    return this.http.post<Enquiry>(`${this.apiUrl}/api/enquiry`, enquiry,this.httpOption);
  }
 
  // Update an existing enquiry
  updateEnquiry(id: number, enquiry: Enquiry): Observable<Enquiry> {
    return this.http.put<Enquiry>(`${this.apiUrl}/api/enquiry/${id}`, enquiry,this.httpOption);
  }
 
  // Delete an enquiry
  deleteEnquiry(id: number): Observable<any> { // Response type can be adjusted based on API response
    return this.http.delete<any>(`${this.apiUrl}/api/enquiry/${id}`,this.httpOption);
  }
 
  // Get enquiries by user ID
  getEnquiriesByUserId(userId: number): Observable<Enquiry[]> {
    return this.http.get<Enquiry[]>(`${this.apiUrl}/api/user/${userId}`,this.httpOption);
  }
}
 