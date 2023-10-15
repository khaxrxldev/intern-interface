import { TestBed } from '@angular/core/testing';

import { InternUserService } from './intern-user.service';

describe('InternUserService', () => {
  let service: InternUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
