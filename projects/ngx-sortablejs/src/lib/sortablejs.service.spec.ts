import { TestBed } from '@angular/core/testing';

import { SortablejsService } from './sortablejs.service';

describe('SortablejsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SortablejsService = TestBed.inject(SortablejsService);
    expect(service).toBeTruthy();
  });
});
