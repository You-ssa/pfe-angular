import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSecComponent } from './register-sec.component';

describe('RegisterSecComponent', () => {
  let component: RegisterSecComponent;
  let fixture: ComponentFixture<RegisterSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
