import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IMatchDetailsResponse } from '../data/models/match-details.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchDetailsService {

  private baseUrl: string = environment.remoteApiUrl + "v1/";
  private http = inject(HttpClient);
  constructor() { }

  getMatchDetails(match_uid: string): Observable<IMatchDetailsResponse> {
    if (!match_uid) {
      return throwError(() => new Error('Invalid match UID'));
    }

    const url = `${this.baseUrl}match/${match_uid}`;
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey,
      'Content-Type': 'application/json'
    });
    return this.http.get<IMatchDetailsResponse>(url, { headers });
  }

}
