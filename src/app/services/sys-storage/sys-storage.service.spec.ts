import { TestBed } from '@angular/core/testing';

import { SysStorageService } from './sys-storage.service';

describe('SysStorageService', () => {
  let service: SysStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
