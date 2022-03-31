import { TestBed } from '@angular/core/testing';

import { ListSortService } from './list-sort.service';

describe('ListSortService', () => {
  let service: ListSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
