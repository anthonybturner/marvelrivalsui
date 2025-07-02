import { TestBed } from '@angular/core/testing';

import { GameMapsService } from './game-maps.service';

describe('GameMapsService', () => {
  let service: GameMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
