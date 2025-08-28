import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError, of, map } from 'rxjs';
import { ILeaderBoardResponse as ILeaderboardResponse } from '../data/models/leaderboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private baseUrl: string = environment.remoteApiUrl + "v1/";
  private http = inject(HttpClient);

  getPlayers(heroName: any): Observable<ILeaderboardResponse> {
    const url = `${this.baseUrl}heroes/leaderboard/${heroName}`; // Added endpoint path
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });
    return this.http.get<ILeaderboardResponse>(url, { headers });
  }
}