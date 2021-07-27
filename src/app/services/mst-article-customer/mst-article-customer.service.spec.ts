import { TestBed } from '@angular/core/testing';

import { MstArticleCustomerService } from './mst-article-customer.service';

describe('MstArticleCustomerService', () => {
  let service: MstArticleCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstArticleCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
