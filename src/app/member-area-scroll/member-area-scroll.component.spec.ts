import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAreaScrollComponent } from './member-area-scroll.component';

describe('MemberAreaScrollComponent', () => {
  let component: MemberAreaScrollComponent;
  let fixture: ComponentFixture<MemberAreaScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAreaScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAreaScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
