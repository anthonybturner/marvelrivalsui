import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IDevDiary } from './data/dev-diaries.model';
import { getImageUrl } from '../shared/utilities/image-utils';

@Component({
  selector: 'mr-dev-diaries',
  standalone: false,
  templateUrl: './dev-diaries.component.html',
  styleUrl: './dev-diaries.component.scss'
})
export class DevDiariesComponent  implements OnInit, OnDestroy {

    ngUnsubscribe = new Subject();
    devDiaries: IDevDiary[] = [];
    getImageUrl = getImageUrl;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((results) => {
      this.devDiaries = results["resolvedData"].dev_diaries;
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}