import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGameMap, IGameMapsResponse } from '../data/game-maps.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameMapsService {

  private baseUrl: string = environment.remoteApiUrl;

  private http = inject(HttpClient);
  private mapsSubject = new BehaviorSubject<IGameMap[]>([]);
  maps$ = this.mapsSubject.asObservable();
  private maps: IGameMap[] = [];

  constructor() {

    this.getMaps().subscribe({
      next: (response) => {
        this.maps = response.maps;
        this.mapsSubject.next(this.maps);
      },
      error: (error) => {
        console.error('Error fetching maps:', error);
      }
    });
  }

  getMaps(): Observable<IGameMapsResponse> {
    const url = `${this.baseUrl}v1/maps`;
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey,
      'Content-Type': 'application/json'
    });
    return this.http.get<IGameMapsResponse>(url, { headers });
  }

  getMap(map_id: number): IGameMap | undefined {
    const found = this.maps.find(m => m.id == map_id);
    return found ? found : undefined;
  }
  getMapNameById(map_id: any): any {
    const found = this.maps.find(m => m.id == map_id);
    return found ? found.name : 'Unknown Map';
  }
}
