import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondateursDetailComponent } from './fondateurs-detail.component';

describe('FondateursDetailComponent', () => {
  let component: FondateursDetailComponent;
  let fixture: ComponentFixture<FondateursDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FondateursDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FondateursDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
