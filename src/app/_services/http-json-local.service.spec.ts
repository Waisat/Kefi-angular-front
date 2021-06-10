import { TestBed } from '@angular/core/testing';

import { HttpJsonLocalService } from './http-json-local.service';

describe('HttpJsonLocalService', () => {
  let service: HttpJsonLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpJsonLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
