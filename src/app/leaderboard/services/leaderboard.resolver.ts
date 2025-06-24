import { Injectable, Inject } from '@angular/core';
import { ILeaderBoardResponse, ILeaderBoardPlayer } from '../data/models/leaderboard.model';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LeaderBoardService } from './leaderboard.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardResolver implements Resolve<ILeaderBoardResponse> {
  hero_name: string = "Psylocke";
  constructor(@Inject(LeaderBoardService) private heroBoardService: LeaderBoardService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILeaderBoardResponse> {
    return this.heroBoardService.getPlayers(this.hero_name).pipe(
      map((response: ILeaderBoardResponse) => ({
        hero_name: this.hero_name,
        players: response.players.map(player => ({
          ...player,
          win_rate: player.matches ? player.wins / player.matches : 0
        }))
      }))
    );
  }
}