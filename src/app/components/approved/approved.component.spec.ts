import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApprovedComponent } from './approved.component';

describe('RecentRequestsComponent', () => {
  let component: ApprovedComponent;
  let fixture: ComponentFixture<ApprovedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
