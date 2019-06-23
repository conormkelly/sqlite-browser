import { TestBed } from '@angular/core/testing';

import { QueryHistoryService } from './query-history.service';

describe('QueryHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryHistoryService = TestBed.get(QueryHistoryService);
    expect(service).toBeTruthy();
  });
});
