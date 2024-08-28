
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService) as any;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('Frontend_AuthService should send a POST request to register a Admin', () => {
    const newUser = {userId: 1, username: 'testUser', password: 'testPassword', email: 'test@example.com', userRole: 'ADMIN' };

    service['register'](newUser).subscribe((userResponse: any) => {
      expect(userResponse).toBeDefined();
      expect(userResponse.username).toEqual(newUser.username);
      expect(userResponse.email).toEqual(newUser.email);
      // Add more assertions based on your implementation
    });

    const req = httpTestingController.expectOne(`${(service as any).apiUrl}/auth/register`);
    expect(req.request.method).toEqual('POST');

    req.flush(newUser);
  });

  fit('Frontend_AuthService should send a POST request to register a Student', () => {
    const newUser = {userId: 1, username: 'testUser', password: 'testPassword', email: 'test@example.com', userRole: 'STUDENT' };

    service['register'](newUser).subscribe((userResponse: any) => {
      expect(userResponse).toBeDefined();
      expect(userResponse.username).toEqual(newUser.username);
      expect(userResponse.email).toEqual(newUser.email);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/auth/register`);
    expect(req.request.method).toEqual('POST');

    req.flush(newUser);
  });

  fit('Frontend_AuthService should send a POST request to login', () => {
    const email = 'testUser@gmail.com';
    const password = 'Test@123';
    const user: any = { password, email };

    service['login'](user).subscribe((loginResponse: any) => {
      expect(loginResponse).toBeDefined();
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/auth/login`);
    expect(req.request.method).toEqual('POST');

    req.flush(user);
  });
});

