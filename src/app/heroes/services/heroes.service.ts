import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IHero } from '../hero/data/models/hero.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  getHeroes(): Observable<IHero[]> {
    const url = `${this.baseUrl}heroes`; // Added endpoint path
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey,
      'Content-Type': 'application/json'
    });
    return this.http.get<IHero[]>(url, { headers });
  }

  getHero(hero: string): Observable<IHero> {
    const url = `${this.baseUrl}heroes/${hero}`; // Added endpoint path
    const headers = new HttpHeaders({
      'x-api-key': environment.apiKey,
      'Content-Type': 'application/json'
    });
    return this.http.get<IHero>(url, { headers });
  }
}