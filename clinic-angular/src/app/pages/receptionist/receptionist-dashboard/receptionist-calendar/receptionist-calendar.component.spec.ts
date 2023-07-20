import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistCalendarComponent } from './receptionist-calendar.component';

describe('ReceptionistCalendarComponent', () => {
  let component: ReceptionistCalendarComponent;
  let fixture: ComponentFixture<ReceptionistCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionistCalendarComponent]
    });
    fixture = TestBed.createComponent(ReceptionistCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
