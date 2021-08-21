import { TestBed } from '@angular/core/testing';

import { AstroTimeService } from './astro-time.service';

describe('AstroTimeService', () => {
  let service: AstroTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstroTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
