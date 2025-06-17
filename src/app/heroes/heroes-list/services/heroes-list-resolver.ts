import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeroService } from './hero.service';
import { Observable } from 'rxjs';
import { IHero } from '../../hero/data/models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesListResolver implements Resolve<Observable<IHero[]>> {

  constructor(private heroService: HeroService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHero[]> {
    return this.heroService.getHeroes();
  }
}