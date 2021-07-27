import { TestBed } from '@angular/core/testing';

import { MstArticleItemService } from './mst-article-item.service';

describe('MstArticleItemService', () => {
  let service: MstArticleItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstArticleItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
