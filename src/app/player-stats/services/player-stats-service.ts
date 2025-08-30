import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerStats } from '../data/player-stats.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {

  private baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  getPlayerStats(playerUid: string | null): Observable<PlayerStats> {
    const altUrl = 'https://marvelrivalsapi.com/api/'

    const url = `${altUrl}v1/player/${playerUid}`; // Added endpoint path
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });
    return this.http.get<PlayerStats>(url, { headers });
  }   
}