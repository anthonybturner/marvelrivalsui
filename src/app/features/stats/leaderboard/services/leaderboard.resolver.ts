import { Injectable, Inject } from '@angular/core';
import { ILeaderBoardResponse as ILeaderboardResponse, ILeaderBoardPlayer } from '../data/models/leaderboard.model';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LeaderboardService as LeaderboardService } from './leaderboard.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardResolver implements Resolve<ILeaderboardResponse> {
  hero_name: string = "Psylocke";
  constructor(@Inject(LeaderboardService) private leaderboardService: LeaderboardService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILeaderboardResponse> {
    return this.leaderboardService.getPlayers(this.hero_name).pipe(
      map((response: ILeaderboardResponse) => ({
        hero_name: this.hero_name,
        players: response.players.map(player => ({
          ...player,
          win_rate: player.matches ? player.wins / player.matches : 0
        }))
      }))
    );
  }
}