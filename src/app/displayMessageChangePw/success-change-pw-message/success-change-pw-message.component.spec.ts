import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessChangePwMessageComponent } from './success-change-pw-message.component';

describe('SuccessChangePwMessageComponent', () => {
  let component: SuccessChangePwMessageComponent;
  let fixture: ComponentFixture<SuccessChangePwMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessChangePwMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessChangePwMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
