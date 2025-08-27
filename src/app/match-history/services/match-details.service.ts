import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IMatchDetailsResponse } from '../data/models/match-details.model';

@Injectable({
  providedIn: 'root'
})
export class MatchDetailsService {

  private baseUrl: string =  'https://marvelrivalsapi.com/api/v1/';
  private http = inject(HttpClient);

  constructor() { }

  getMatchDetails(match_uid: string): Observable<IMatchDetailsResponse> {
    if(!match_uid) {
      return throwError(() => new Error('Invalid match UID'));
    }   

    const url = `${this.baseUrl}match/${match_uid}`;
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });
    return this.http.get<IMatchDetailsResponse>(url, { headers });
  }

}
