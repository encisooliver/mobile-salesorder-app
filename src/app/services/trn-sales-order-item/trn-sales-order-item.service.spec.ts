import { TestBed } from '@angular/core/testing';

import { TrnSalesOrderItemService } from './trn-sales-order-item.service';

describe('TrnSalesOrderItemService', () => {
  let service: TrnSalesOrderItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnSalesOrderItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
