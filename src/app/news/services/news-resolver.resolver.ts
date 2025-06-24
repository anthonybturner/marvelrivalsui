import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ICompleteNewsDashboard } from '../data/models/news.model';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsResolver implements Resolve<Observable<ICompleteNewsDashboard>> {

  constructor(private newsService: NewsService) { }

  resolve(): Observable<ICompleteNewsDashboard> {
    return this.newsService.getCompleteNewsDashboard();
  }
}
