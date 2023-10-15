import { TestBed } from '@angular/core/testing';

import { InternCoreService } from './intern-core.service';

describe('InternCoreService', () => {
  let service: InternCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
