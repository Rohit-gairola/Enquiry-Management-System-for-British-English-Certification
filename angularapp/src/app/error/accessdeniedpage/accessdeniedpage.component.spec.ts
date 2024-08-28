import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessdeniedpageComponent } from './accessdeniedpage.component';

describe('AccessdeniedpageComponent', () => {
  let component: AccessdeniedpageComponent;
  let fixture: ComponentFixture<AccessdeniedpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessdeniedpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessdeniedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
