import { Injectable, Inject } from '@angular/core';
import { IHeroBoardResponse, IHeroBoardPlayer } from '../data/models/hero-board.model';

import { ActivatedRouteSnapshot,  Resolve, RouterStateSnapshot } from '@angular/router';
import { LeaderBoardService } from './leader-board.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroBoardResolver implements Resolve<IHeroBoardPlayer[]> {

  constructor(@Inject(LeaderBoardService) private heroBoardService: LeaderBoardService) { }
  
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