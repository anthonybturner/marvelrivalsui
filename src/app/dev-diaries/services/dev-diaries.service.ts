import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDevDiary } from '../data/dev-diaries.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IDevDiariesResponse } from '../data/dev-diaries-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevDiaryService {

  private baseUrl: string = environment.remoteApiUrl + "v1/";
  private http = inject(HttpClient);
  private devDiariesSubject = new BehaviorSubject<IDevDiary[]>([]);
  devDiaries$ = this.devDiariesSubject.asObservable();

  constructor() {
  }

  getAll(): Observable<IDevDiariesResponse> {
    const url = `${this.baseUrl}dev-diaries`;
    const headers = new HttpHeaders({
      'x-api-key': '27fe50d87b5dbebd1ab01589b08a2e00d3c6058a07097c0d6ee47a84e8f4c329',
      'Content-Type': 'application/json'
    });

    return this.http.get<IDevDiariesResponse>(url, { headers }).pipe(
      map((response: IDevDiariesResponse) => {
        this.devDiariesSubject.next(response.dev_diaries);
        return response;
      })
    )
  }
}
