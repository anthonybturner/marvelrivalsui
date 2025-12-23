import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMatchHistoryItem, IMatchHistoryResponse } from '../data/models/match-history.model';
import { Observable, Subject, filter, map, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameMapsService } from 'src/app/game-maps/services/game-maps.service';
import { IGameMap } from 'src/app/game-maps/data/game-maps.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchHistoryService {

  private baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  public matchHistoryUpdated$ = new Subject<IMatchHistoryItem[]>();

  constructor(private gameMapService: GameMapsService) { }

  private getImageUrlBySize(map: IGameMap, size: string) {
    return map ? (function () {
      switch (size) {
        case 'small': return map.images[0];
        case 'medium': return map.images[1];
        case 'large': return map.images[2];
        case 'x-large': return map.images[3];
        default: return map.images[0];
      }
    })() : undefined;
  }

  getMapThumbnail(map_id: number) {
    const map = this.gameMapService.getMap(map_id);
    if (!map) {
      return ''; // or a default image path if you prefer
    }
    let mapImagePath = this.getImageUrlBySize(map, 'large');
    return "https://www.marvelrivalsapi.com/" + mapImagePath;
  }

  getPlayerHistory(playerGUID: string): Observable<IMatchHistoryItem[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey,
      'Content-Type': 'application/json'
    });
    const url = `${this.baseUrl}match-history/${playerGUID}`;
    return this.http.get<IMatchHistoryItem[]>(url, { headers });
  }
}