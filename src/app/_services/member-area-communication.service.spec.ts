import { TestBed } from '@angular/core/testing';

import { MemberAreaCommunicationService } from './member-area-communication.service';

describe('MemberAreaCommunicationService', () => {
  let service: MemberAreaCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberAreaCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
