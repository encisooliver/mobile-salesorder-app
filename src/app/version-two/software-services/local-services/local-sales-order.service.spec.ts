import { TestBed } from '@angular/core/testing';

import { LocalSalesOrderService } from './local-sales-order.service';

describe('LocalSalesOrderService', () => {
  let service: LocalSalesOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalSalesOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
