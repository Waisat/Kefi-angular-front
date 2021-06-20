import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersAreaDetailComponent } from './members-area-detail.component';

describe('MembersAreaDetailComponent', () => {
  let component: MembersAreaDetailComponent;
  let fixture: ComponentFixture<MembersAreaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersAreaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersAreaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
