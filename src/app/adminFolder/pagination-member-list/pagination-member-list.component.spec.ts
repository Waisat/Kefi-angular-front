import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationMemberListComponent } from './pagination-member-list.component';

describe('PaginationMemberListComponent', () => {
  let component: PaginationMemberListComponent;
  let fixture: ComponentFixture<PaginationMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationMemberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
