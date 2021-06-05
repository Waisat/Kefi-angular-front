import { TestBed } from '@angular/core/testing';

import { UtilitiesCheckService } from './utilities-check.service';

describe('UtilitiesCheckService', () => {
  let service: UtilitiesCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
