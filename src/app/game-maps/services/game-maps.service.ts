import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGameMap, IGameMapsResponse } from '../data/game-maps.model';
import { map, Observable } from 'rxjs';
import { rescaleSpan } from 'ag-charts-community/dist/types/src/chart/series/cartesian/lineInterpolation';

@Injectable({
  providedIn: 'root'
})
export class GameMapsService {


  private baseUrl: string = 'https://marvelrivalsapi.com/api/v1/';
  private http = inject(HttpClient);
  maps: IGameMap[] = [];
  constructor() { }


  getMaps(): Observable<IGameMapsResponse> {
    const url = `${this.baseUrl}maps?limit=42`;
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });

    return this.http.get<IGameMapsResponse>(url, { headers }).pipe(
      map((response: IGameMapsResponse) => {
        this.maps = response.maps;
        return response;
      })
    )
  }

  getMapNameById(map_id: any): any {
    const found = this.maps.find(m => m.id == map_id);
    return found ? found.name : 'Unknown Map';
  }
}
