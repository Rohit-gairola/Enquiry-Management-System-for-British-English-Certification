import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnquiryComponent } from './add-enquiry.component';

describe('AddEnquiryComponent', () => {
  let component: AddEnquiryComponent;
  let fixture: ComponentFixture<AddEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
