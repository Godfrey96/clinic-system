import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReceptionComponent } from './admin-reception.component';

describe('AdminReceptionComponent', () => {
  let component: AdminReceptionComponent;
  let fixture: ComponentFixture<AdminReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
