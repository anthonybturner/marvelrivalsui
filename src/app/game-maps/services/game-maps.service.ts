import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGameMap, IGameMapsResponse } from '../data/game-maps.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameMapsService {


  private baseUrl: string = 'https://marvelrivalsapi.com/api/v1/maps';
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
    const url = `${this.baseUrl}?limit=42`;
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

  getMapUrlById(map_id: number, size: 'small' | 'medium' | 'large' | 'x-large'): string {
    return this.getImageUrlBySize(map_id, size);
  };

  getMap(map_id: number): IGameMap | undefined {
      const found = this.maps.find(m => m.id == map_id);
      return found ? found : undefined;
  }

  private getImageUrlBySize(map_id: number, size: string) {
    const found = this.maps.find(m => m.id == map_id);
    return found ? (function () {
      switch (size) {
        case 'small': return found.images[0];
        case 'medium': return found.images[1];
        case 'large': return found.images[2];
        case 'x-large': return found.images[2];
        default: return found.images[0];
      }
    })() : 'Unknown Map';
  }

  getMapNameById(map_id: any): any {
    const found = this.maps.find(m => m.id == map_id);
    return found ? found.name : 'Unknown Map';
  }
}
