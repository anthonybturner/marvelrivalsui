import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { IBalances, IDevDiaries, IGameVersions, IMaps, INews, IPatchNotes } from '../data/models/news.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl: string = environment.remoteApiUrl + "v1/";
  private http = inject(HttpClient);
  headers:HttpHeaders = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });
  private mockNews: INews[] = [
    { id: "1", name: "News Article One", description: "News description", image: "test.jpg" }
  ];

getCompleteNewsDashboard(): Observable<{
    patches: IPatchNotes[],
    balances: IBalances[],
    diaries: IDevDiaries[],
    versions: IGameVersions[],
    maps: IMaps[]
  }> {
    return forkJoin({
      patches: this.getPatchNotes(),
      balances: this.getBalances(),
      diaries: this.getDevDiaries(),
      versions: this.getGameVersions(),
      maps: this.getMaps()
    });
  }

  getPatchNotes(): Observable<IPatchNotes[]> {
     return this.http.get<IPatchNotes[]>(this.getFullUrl('patch-notes'), {headers: this.headers });
  }

  getBalances(): Observable<IBalances[]> {
     return this.http.get<IBalances[]>(this.getFullUrl('balances'), {headers: this.headers });
  }

    getDevDiaries(): Observable<IDevDiaries[]> {
        return this.http.get<IDevDiaries[]>(this.getFullUrl('dev-diaries'), {headers: this.headers });
    }

  getGameVersions(): Observable<IGameVersions[]> {
    return this.http.get<IGameVersions[]>(this.getFullUrl('game-versions'), {headers: this.headers });
  }

  getMaps(): Observable<IMaps[]> {
    return this.http.get<IMaps[]>(this.getFullUrl('maps'), {headers: this.headers });
  }

  getFullUrl(end_point: string): string{
    return `${this.baseUrl}${end_point}`; // Added endpoint path
  }

  constructor() { }
}
