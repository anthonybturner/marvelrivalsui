import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeroesService } from './heroes.service';
import { Observable } from 'rxjs';
import { IHero } from '../hero/data/models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesResolver implements Resolve<Observable<IHero[]>> {

  constructor(private heroService: HeroesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHero[]> {
    return this.heroService.getHeroes();
  }
}