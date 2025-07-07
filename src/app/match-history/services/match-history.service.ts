import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMatchHistoryItem, IMatchHistoryResponse } from '../data/models/match-history.model';
import { Observable, filter, map, switchMap } from 'rxjs';
import { GameMapsService } from 'src/app/game-maps/services/game-maps.service';

@Injectable({
  providedIn: 'root'
})
export class MatchHistoryService {

  private baseUrl: string = 'https://marvelrivalsapi.com/api/v2/';
  private http = inject(HttpClient);

  constructor(private gameMapService: GameMapsService) { }

  getHistory(playerName: string): import("rxjs").Observable<import("../data/models/match-history.model").IMatchHistoryResponse> {
    throw new Error('Method not implemented.');
  }

  getPlayerHistory(playerName: string): Observable<IMatchHistoryResponse> {
    const url = `${this.baseUrl}player/${playerName}/match-history`;
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });
    return this.http.get<IMatchHistoryResponse>(url, { headers }).pipe(
      switchMap((response: IMatchHistoryResponse) =>
        this.gameMapService.maps$.pipe(
          filter(maps => maps.length > 0), // <-- Wait until maps are loaded
          map(maps => ({
            playerName: response.playerName || playerName,
            match_history: response.match_history.map(match => ({
              ...match,
              match_map_name: (() => {
                const found = maps.find(m => m.id === match.match_map_id);
                return found ? found.name : 'Unknown Map';
              })(),
            }))
          }))
        )
      )
    );
  }
}