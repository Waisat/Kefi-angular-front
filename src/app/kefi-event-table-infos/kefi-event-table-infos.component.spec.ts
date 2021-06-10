import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KefiEventTableInfosComponent } from './kefi-event-table-infos.component';

describe('KefiEventTableInfosComponent', () => {
  let component: KefiEventTableInfosComponent;
  let fixture: ComponentFixture<KefiEventTableInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KefiEventTableInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KefiEventTableInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
