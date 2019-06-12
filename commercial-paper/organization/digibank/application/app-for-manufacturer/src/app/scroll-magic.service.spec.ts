import { TestBed } from '@angular/core/testing';

import { ScrollMagicService } from './scroll-magic.service';

describe('ScrollMagicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollMagicService = TestBed.get(ScrollMagicService);
    expect(service).toBeTruthy();
  });
});
