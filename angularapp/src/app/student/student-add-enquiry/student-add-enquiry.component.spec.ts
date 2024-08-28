import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddEnquiryComponent } from './student-add-enquiry.component';

describe('StudentAddEnquiryComponent', () => {
  let component: StudentAddEnquiryComponent;
  let fixture: ComponentFixture<StudentAddEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAddEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
