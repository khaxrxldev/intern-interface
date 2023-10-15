import { TestBed } from '@angular/core/testing';

import { InternUserReactiveService } from './intern-user-reactive.service';

describe('InternUserReactiveService', () => {
  let service: InternUserReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternUserReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
