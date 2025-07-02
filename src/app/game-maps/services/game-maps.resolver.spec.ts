import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { gameMapsResolver } from './game-maps.resolver';

describe('gameMapsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => gameMapsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
