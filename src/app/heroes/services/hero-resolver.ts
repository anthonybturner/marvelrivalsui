import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { HeroService } from './hero.service';
import { IHeroResolvedData } from '../data/models/hero-resolved-data';
import { IHero, IHeroResponse } from '../data/models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroResolver implements Resolve<IHeroResponse> {

  constructor(private heroService: HeroService) { }

  resolve(): Observable<IHeroResponse> {
    return this.heroService.getHeroes()
  }
}

export { IHeroResolvedData };
