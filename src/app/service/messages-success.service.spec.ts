import { TestBed } from '@angular/core/testing';

import { MessagesSuccessService } from './messages-success.service';

describe('MessagesSuccessService', () => {
  let service: MessagesSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
