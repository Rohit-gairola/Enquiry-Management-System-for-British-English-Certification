import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { LoginViewModel } from 'src/viewModels/login-view-model';
import { LoginResponseModel } from 'src/viewModels/login-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = "https://8080-caceefbcfcdcdfdceefaacdebdeecab.premiumproject.examly.io"; 

  constructor(private http: HttpClient) { }

  // Register a new user
  register(user: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  login(login: LoginViewModel): Observable<LoginResponseModel>
  {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/auth/login`, login);
  }

  isAuthenticated(allowedRole:string): boolean
  {
    const userRole=localStorage.getItem("userRole");
    if (allowedRole==null || allowedRole==userRole)
    {
      return true;
    }
    return false;
  }
}


