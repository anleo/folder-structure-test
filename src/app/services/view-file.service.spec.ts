import { TestBed } from '@angular/core/testing';

import { ViewFileService } from './view-file.service';

describe('ViewFileService', () => {
  let service: ViewFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
