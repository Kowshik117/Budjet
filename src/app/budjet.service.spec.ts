import { TestBed } from '@angular/core/testing';

import { BudjetService } from './budjet.service';

describe('BudjetService', () => {
  let service: BudjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
