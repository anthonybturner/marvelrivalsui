import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError, of, map } from 'rxjs';
import { ILeaderBoardResponse } from '../data/models/leaderboard.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService {

  private baseUrl: string = 'https://marvelrivalsapi.com/api/v1/';
  private http = inject(HttpClient);

  getPlayers(heroName: any): Observable<ILeaderBoardResponse> {
    const url = `${this.baseUrl}heroes/leaderboard/${heroName}`; // Added endpoint path
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });
    return this.http.get<ILeaderBoardResponse>(url, { headers });
  }
}