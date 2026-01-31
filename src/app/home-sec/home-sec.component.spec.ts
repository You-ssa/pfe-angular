import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSecComponent } from './home-sec.component';

describe('HomeSecComponent', () => {
  let component: HomeSecComponent;
  let fixture: ComponentFixture<HomeSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
