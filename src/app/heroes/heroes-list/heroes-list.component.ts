import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHero } from '../hero/data/models/hero.model';
import { Subject, takeUntil } from 'rxjs';
import { handleImageError, getImageUrl,getRoleColor } from '../../shared/utilities/image-utils';
@Component({
  selector: 'mr-hero',
  standalone: false,
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HerosListComponent implements OnInit, OnDestroy {
  heroes: IHero[] = []
  ngUnsubscribe = new Subject();
  isLoading: boolean = false;

  handleImageError = handleImageError;
  getImageUrl = getImageUrl;
  getRoleColor = getRoleColor;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((results) =>{
      this.heroes = results["resolvedData"];
    })
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
