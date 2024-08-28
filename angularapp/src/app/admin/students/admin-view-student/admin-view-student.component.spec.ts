import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewStudentComponent } from './admin-view-student.component';

describe('AdminViewStudentComponent', () => {
  let component: AdminViewStudentComponent;
  let fixture: ComponentFixture<AdminViewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
