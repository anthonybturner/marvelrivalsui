import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError, of, map } from 'rxjs';
import { ILeaderBoardResponse as ILeaderboardResponse } from '../data/models/leaderboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private baseUrl: string = environment.remoteApiUrl + "v2/";
  private http = inject(HttpClient);

  getPlayers(heroName: any): Observable<ILeaderboardResponse> {
    const url = `${this.baseUrl}heroes/leaderboard/${heroName}`; // Added endpoint path
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey,
      'Content-Type': 'application/json'
    });
    return this.http.get<ILeaderboardResponse>(url, { headers });
  }
}