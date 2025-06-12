import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { HeroBoardResolver } from './hero-board.resolver';

describe('playerResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => HeroBoardResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
