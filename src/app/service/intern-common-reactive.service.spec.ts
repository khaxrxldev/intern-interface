import { TestBed } from '@angular/core/testing';

import { InternCommonReactiveService } from './intern-common-reactive.service';

describe('InternCommonReactiveService', () => {
  let service: InternCommonReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternCommonReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
