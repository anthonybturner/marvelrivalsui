import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HeroService } from './hero.service';
import { IHeroResolvedData } from '../data/models/hero-resolved-data';
import { IHeroResponse } from '../data/models/hero.model';
import { Observable } from 'rxjs';

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