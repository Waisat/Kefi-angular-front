import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideKefiUserComponent } from './aside-kefi-user.component';

describe('AsideKefiUserComponent', () => {
  let component: AsideKefiUserComponent;
  let fixture: ComponentFixture<AsideKefiUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideKefiUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideKefiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
