import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [RegistrationComponent],
      providers: [AuthService]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent) as any;
    component = fixture.componentInstance as any;
    authService = TestBed.inject(AuthService) as any;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  fit('Frontend_should show Email Invalid error message on register page RegistrationComponent', fakeAsync(() => {
    const emailInput = debugElement.query(By.css('#email'));
    emailInput.nativeElement.value = 12345678; // Set an empty value
    emailInput.nativeElement.dispatchEvent(new Event('input')); // Trigger input event
    fixture.detectChanges();

    tick(); // Advance time to handle async operations

    const errorMessage = debugElement.query(By.css('.error-message'));

    expect(errorMessage.nativeElement.textContent).toContain('Invalid email format');
  }));

  fit('Frontend_should show MobileNumber Invalid error message on register page RegistrationComponent', fakeAsync(() => {
    const mobileInput = debugElement.query(By.css('#mobile'));
    mobileInput.nativeElement.value = 12345678; // Set an empty value
    mobileInput.nativeElement.dispatchEvent(new Event('input')); // Trigger input event
    fixture.detectChanges();

    tick(); // Advance time to handle async operations

    const errorMessage = debugElement.query(By.css('.error-message'));

    expect(errorMessage.nativeElement.textContent).toContain('Invalid mobile number format');
  }));
});
