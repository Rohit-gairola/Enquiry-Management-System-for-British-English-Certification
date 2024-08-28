import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddPaymentComponent } from './student-add-payment.component';

describe('StudentAddPaymentComponent', () => {
  let component: StudentAddPaymentComponent;
  let fixture: ComponentFixture<StudentAddPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAddPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
