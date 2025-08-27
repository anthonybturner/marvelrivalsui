import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGameMap, IGameMapsResponse } from '../data/game-maps.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameMapsService {


//  private baseUrl: string = 'https://marvelrivalsapi.com/api/v1/maps';
  private baseUrl: string = 'https://localhost:44312/api/';

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
    const url = `${this.baseUrl}game-maps`;
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });

    return this.http.get<IGameMap[]>(url, { headers }).pipe(
      map((response: IGameMap[]) => {
        this.maps = response;
        this.mapsSubject.next(this.maps);
        return {
          maps : this.maps,
          total_maps: this.maps.length
        } as IGameMapsResponse;
      })
    )
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
