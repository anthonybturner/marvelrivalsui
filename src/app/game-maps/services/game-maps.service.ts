import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGameMap, IGameMapsResponse } from '../data/game-maps.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameMapsService {

  private baseUrl: string = environment.apiUrl;

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
      'x-api-key': environment.apiKey,
      'Content-Type': 'application/json'
    });

    return this.http.get<IGameMap[]>(url, { headers }).pipe(
      map((response: IGameMap[]) => {
        this.maps = response;
        this.mapsSubject.next(this.maps);
        return {
          maps: this.maps,
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
