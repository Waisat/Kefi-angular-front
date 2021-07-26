import { TestBed } from '@angular/core/testing';

import { CheckForFirstConnexionService } from './check-for-first-connexion.service';

describe('CheckForFirstConnexionService', () => {
  let service: CheckForFirstConnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckForFirstConnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
