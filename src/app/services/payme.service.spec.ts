import { TestBed } from '@angular/core/testing';

import { PaymeService } from './payme.service';

describe('PaymeService', () => {
  let service: PaymeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
