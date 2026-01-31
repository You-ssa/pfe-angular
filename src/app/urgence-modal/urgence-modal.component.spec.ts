import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgenceModalComponent } from './urgence-modal.component';

describe('UrgenceModalComponent', () => {
  let component: UrgenceModalComponent;
  let fixture: ComponentFixture<UrgenceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrgenceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
