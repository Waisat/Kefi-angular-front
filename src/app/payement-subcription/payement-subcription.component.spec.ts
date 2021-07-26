import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementSubcriptionComponent } from './payement-subcription.component';

describe('PayementSubcriptionComponent', () => {
  let component: PayementSubcriptionComponent;
  let fixture: ComponentFixture<PayementSubcriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementSubcriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementSubcriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
