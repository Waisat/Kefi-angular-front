import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationMemberComponent } from './pagination-member.component';

describe('PaginationMemberComponent', () => {
  let component: PaginationMemberComponent;
  let fixture: ComponentFixture<PaginationMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
