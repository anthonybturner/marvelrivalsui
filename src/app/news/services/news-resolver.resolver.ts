import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { INews } from '../data/models/news.model';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsResolver implements Resolve<Observable<INews[]>> {

  constructor(private newsService: NewsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INews[]> {
    return this.newsService.getLatest();
  }
}