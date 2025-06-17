import { TestBed } from '@angular/core/testing';

import { HeroBoardService } from './hero-board.service';

describe('HeroBoardService', () => {
  let service: HeroBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
