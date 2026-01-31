import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMedComponent } from './register-med.component';

describe('RegisterMedComponent', () => {
  let component: RegisterMedComponent;
  let fixture: ComponentFixture<RegisterMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
