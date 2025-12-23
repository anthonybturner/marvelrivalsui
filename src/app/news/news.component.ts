import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompleteNewsDashboard, INews } from './data/models/news.model';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mr-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  news$?: Observable<ICompleteNewsDashboard>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.news$ = this.activatedRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((results) => results["resolvedData"] as ICompleteNewsDashboard)
      );
  }

  ngOnDestroy(): void {
  }

}