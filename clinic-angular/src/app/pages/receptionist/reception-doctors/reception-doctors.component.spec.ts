import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionDoctorsComponent } from './reception-doctors.component';

describe('ReceptionDoctorsComponent', () => {
  let component: ReceptionDoctorsComponent;
  let fixture: ComponentFixture<ReceptionDoctorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionDoctorsComponent]
    });
    fixture = TestBed.createComponent(ReceptionDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
