import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNavMemberListComponent } from './search-nav-member-list.component';

describe('SearchNavMemberListComponent', () => {
  let component: SearchNavMemberListComponent;
  let fixture: ComponentFixture<SearchNavMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNavMemberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNavMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
