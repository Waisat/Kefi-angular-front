import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorChangePwMessageComponent } from './error-change-pw-message.component';

describe('ErrorChangePwMessageComponent', () => {
  let component: ErrorChangePwMessageComponent;
  let fixture: ComponentFixture<ErrorChangePwMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorChangePwMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorChangePwMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
