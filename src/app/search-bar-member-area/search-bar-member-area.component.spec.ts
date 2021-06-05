import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarMemberAreaComponent } from './search-bar-member-area.component';

describe('SearchBarMemberAreaComponent', () => {
  let component: SearchBarMemberAreaComponent;
  let fixture: ComponentFixture<SearchBarMemberAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarMemberAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarMemberAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
