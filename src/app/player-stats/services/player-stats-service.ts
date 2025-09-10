import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerStats } from '../data/player-stats.model';
import { PlayerDataResponse } from '../data/player-data-response.model';
import { themeNames } from 'ag-charts-community/dist/types/src/integrated-charts-theme';

@Injectable({
    providedIn: 'root'
})
export class PlayerStatsService {

    private baseUrl: string = environment.apiUrl;
    private altUrl: string = 'https://marvelrivalsapi.com/api/';
    private http = inject(HttpClient);

    updatePlayerStats(playerName: string): Observable<PlayerDataResponse> {
        if (playerName == '') {
            // Return an empty observable if playerName is empty
            return of({} as PlayerDataResponse);
        }
        const url = `${this.altUrl}v1/player/${playerName}/update`; // Added endpoint path
        const headers = new HttpHeaders({
            'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
            'Content-Type': 'application/json'
        });
        return this.http.get<PlayerDataResponse>(url, { headers });
    }


    getPlayerStats(playerUid: string | null): Observable<PlayerStats> {

        const url = `${this.altUrl}v1/player/${playerUid}`; // Added endpoint path
        const headers = new HttpHeaders({
            'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
            'Content-Type': 'application/json'
        });
        return this.http.get<PlayerStats>(url, { headers });
    }
}