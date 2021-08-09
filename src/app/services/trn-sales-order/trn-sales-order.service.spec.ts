import { TestBed } from '@angular/core/testing';

import { TrnSalesOrderService } from './trn-sales-order.service';

describe('TrnSalesOrderService', () => {
  let service: TrnSalesOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnSalesOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
