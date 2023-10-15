import { TestBed } from '@angular/core/testing';

import { InternCommonService } from './intern-common.service';

describe('InternCommonService', () => {
  let service: InternCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
