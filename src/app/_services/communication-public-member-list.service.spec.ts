import { TestBed } from '@angular/core/testing';

import { CommunicationPublicMemberListService } from './communication-public-member-list.service';

describe('CommunicationPublicMemberListService', () => {
  let service: CommunicationPublicMemberListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationPublicMemberListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
