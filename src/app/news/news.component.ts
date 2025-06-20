import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from './data/models/news.model';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mr-news',
  standalone: false,
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  news$?: Observable<INews[]>;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.news$ = this.activatedRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((results) => results["resolvedData"] as INews[])
      );

  }

  ngOnDestroy(): void {

  }
}

