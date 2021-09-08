import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordLinkComponent } from './forget-password-link.component';

describe('ForgetPasswordLinkComponent', () => {
  let component: ForgetPasswordLinkComponent;
  let fixture: ComponentFixture<ForgetPasswordLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
