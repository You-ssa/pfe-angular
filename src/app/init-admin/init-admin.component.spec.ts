import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitAdminComponent } from './init-admin.component';

describe('InitAdminComponent', () => {
  let component: InitAdminComponent;
  let fixture: ComponentFixture<InitAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
