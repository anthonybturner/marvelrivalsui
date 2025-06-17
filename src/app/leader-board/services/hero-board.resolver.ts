import { Injectable, Inject } from '@angular/core';
import { IHeroBoardResponse, IHeroBoardPlayer } from '../data/models/hero-board-resolved-data';

import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { HeroBoardService } from './hero-board.service';
import { map, Observable } from 'rxjs';
import { IHeroInfo } from '../data/models/hero-board.model';

@Injectable({
  providedIn: 'root'
})
export class HeroBoardResolver implements Resolve<IHeroBoardPlayer[]> {

  constructor(@Inject(HeroBoardService) private heroBoardService: HeroBoardService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHeroBoardPlayer[]> {
      return this.heroBoardService.getPlayers("Psylocke").pipe(
      map((response: IHeroBoardResponse) =>
        response.players.map(player => ({
          ...player,
          // Optionally add transformed fields here, e.g.:
          win_rate: player.matches ? player.wins / player.matches : 0
        }))
      )
    );
  }
}