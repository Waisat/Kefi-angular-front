import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsParticipationEventComponent } from './buttons-participation-event.component';

describe('ButtonsParticipationEventComponent', () => {
  let component: ButtonsParticipationEventComponent;
  let fixture: ComponentFixture<ButtonsParticipationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsParticipationEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsParticipationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
