import { TestBed } from '@angular/core/testing';

import { FolderItemService } from './folder-item.service';

describe('FolderItemService', () => {
  let service: FolderItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
