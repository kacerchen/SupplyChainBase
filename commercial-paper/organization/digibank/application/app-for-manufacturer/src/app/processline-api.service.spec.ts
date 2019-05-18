import { TestBed } from '@angular/core/testing';

import { ProcesslineApiService } from './processline-api.service';

describe('ProcesslineApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesslineApiService = TestBed.get(ProcesslineApiService);
    expect(service).toBeTruthy();
  });
});
