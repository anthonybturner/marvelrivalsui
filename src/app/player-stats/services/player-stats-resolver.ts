import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PlayerStatsService } from './player-stats-service';
import { Observable } from 'rxjs';
import { PlayerStats } from '../data/player-stats.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsResolver implements Resolve<Observable<PlayerStats>> {

  constructor(private playerStatsService: PlayerStatsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PlayerStats> {
    const playerUid = route.paramMap.get('uid') || '1737805188'; // fallback if not present
    return this.playerStatsService.getPlayerStats(playerUid);
  }
}