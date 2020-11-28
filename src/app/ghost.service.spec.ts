import { TestBed } from '@angular/core/testing';

import { GhostService } from './ghost.service';

describe('GhostService', () => {
  let service: GhostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
