import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerStats } from '../data/player-stats.model';
import { PlayerDataResponse } from '../data/player-data-response.model';

@Injectable({
    providedIn: 'root'
})
export class PlayerStatsService {

    private baseUrl: string = environment.remoteApiUrl;
    private http = inject(HttpClient);

    updatePlayerStats(playerName: string): Observable<PlayerDataResponse> {
        if (playerName == '') {
            // Return an empty observable if playerName is empty
            return of({} as PlayerDataResponse);
        }
        const url = `${this.baseUrl}v1/player/${playerName}/update`; // Added endpoint path
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
            'Content-Type': 'application/json'
        });
        return this.http.get<PlayerDataResponse>(url, { headers });
    }


    getPlayerStats(playerUid: string | null): Observable<PlayerStats> {

        const url = `${this.baseUrl}v1/player/${playerUid}`; // Added endpoint path
        const headers = new HttpHeaders({
            'x-api-key': environment.apiKey,
            'Content-Type': 'application/json'
        });
        return this.http.get<PlayerStats>(url, { headers });
    }
}