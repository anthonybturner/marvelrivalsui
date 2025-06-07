import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { MatchHistoryService } from './match-history-service';
import { catchError, map, Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';

export class MatchHistoryResolvedData{
  match_map_id: string = '';
  map_thumbnail: string = '';
  match_play_duration: number | null = null;
  match_season: string | null = null;
  match_time_stamp: string | null = null;
  match_uid: string = '';
  match_winner_side: string | null = null;
  mvp_uid: string = '';
  play_mode_id: number | null = null;
  score_info: any = null;
  svp_uid: string = '';
  match_player: any = {};
  game_mode_id: number | null = null;
  hero_thumbnail: string = '';
  player_hero_name: string = '';
  player_hero_kills: number = 0;
  player_hero_deaths: number = 0;
  player_hero_assists: number = 0;
  player_hero_damage: number = 0;
  kills: number = 0;
  deaths: number = 0;
  assists: number = 0;
  total_hero_damage: number = 0;
}
@Injectable({providedIn: 'root'})
export class MatchHistoryResolver implements Resolve<MatchHistoryResolvedData[]> {
  
  constructor(private matchHistoryService: MatchHistoryService) {}

 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MatchHistoryResolvedData[]> {
  const season = route.queryParams['season'] || 2;

  return this.matchHistoryService.getApiMatchHistory(season).pipe(
    map((response: any) =>
      (response?.match_history ?? []).map((item: any) => Object.assign(new MatchHistoryResolvedData(), item))
    ),
    catchError(() => {
      console.error('Error fetching match history data');
      return of([]);
    })
  );
 }
}