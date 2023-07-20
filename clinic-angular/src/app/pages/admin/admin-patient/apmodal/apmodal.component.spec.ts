import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmodalComponent } from './apmodal.component';

describe('ApmodalComponent', () => {
  let component: ApmodalComponent;
  let fixture: ComponentFixture<ApmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApmodalComponent]
    });
    fixture = TestBed.createComponent(ApmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
