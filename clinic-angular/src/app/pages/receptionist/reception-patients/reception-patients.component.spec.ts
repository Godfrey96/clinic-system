import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionPatientsComponent } from './reception-patients.component';

describe('ReceptionPatientsComponent', () => {
  let component: ReceptionPatientsComponent;
  let fixture: ComponentFixture<ReceptionPatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionPatientsComponent]
    });
    fixture = TestBed.createComponent(ReceptionPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
