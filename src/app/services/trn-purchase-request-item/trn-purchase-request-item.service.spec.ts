import { TestBed } from '@angular/core/testing';

import { TrnPurchaseRequestItemService } from './trn-purchase-request-item.service';

describe('TrnPurchaseRequestItemService', () => {
  let service: TrnPurchaseRequestItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnPurchaseRequestItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
