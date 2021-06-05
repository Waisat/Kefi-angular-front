import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddMemberComponent } from './form-add-member.component';

describe('FormAddMemberComponent', () => {
  let component: FormAddMemberComponent;
  let fixture: ComponentFixture<FormAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
