import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewEnquiriesComponent } from './student-view-enquiries.component';

describe('StudentViewEnquiriesComponent', () => {
  let component: StudentViewEnquiriesComponent;
  let fixture: ComponentFixture<StudentViewEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewEnquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
