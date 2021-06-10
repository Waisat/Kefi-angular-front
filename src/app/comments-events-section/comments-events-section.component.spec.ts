import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsEventsSectionComponent } from './comments-events-section.component';

describe('CommentsEventsSectionComponent', () => {
  let component: CommentsEventsSectionComponent;
  let fixture: ComponentFixture<CommentsEventsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsEventsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsEventsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
