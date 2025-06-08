import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMatchHistoryResponse } from './match-history.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchHistoryService {

  private baseUrl: string = 'https://marvelrivalsapi.com/api/v1/player/SilentCoder/match-history';
  //private headers = new HttpHeaders({ 'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329' });

  constructor(private http: HttpClient) {}

    getApiMatchHistory(season?: number): Observable<IMatchHistoryResponse> {
      return this.http.get<IMatchHistoryResponse>(
        `${this.baseUrl}?season=${season}`,
          {
            headers: {'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329'}
          });
    } 
}
