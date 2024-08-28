import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewCoursesComponent } from './student-view-courses.component';

describe('StudentViewCoursesComponent', () => {
  let component: StudentViewCoursesComponent;
  let fixture: ComponentFixture<StudentViewCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
