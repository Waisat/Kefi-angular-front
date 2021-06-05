import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KefiMemberComponent } from './kefi-member.component';

describe('KefiMemberComponent', () => {
  let component: KefiMemberComponent;
  let fixture: ComponentFixture<KefiMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KefiMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KefiMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
