import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INews } from '../data/models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  getLatest(): Observable<INews[]> {
    return of([
      { id: "1", name: "News Article One", description: "News description", image: "test.jpg" }
    ]);
  }

  constructor() { }
}
