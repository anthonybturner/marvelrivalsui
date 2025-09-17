import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHero } from './hero/data/models/hero.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { handleImageError, getImageUrl, getRoleColor } from '../shared/utilities/image-utils';
@Component({
  selector: 'mr-hero',
  standalone: false,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit, OnDestroy {


  heroes: IHero[] = []
  ngUnsubscribe = new Subject();
  isLoading: boolean = false;
  heroName: string = '';

  handleImageError = handleImageError;
  getImageUrl = getImageUrl;
  getRoleColor = getRoleColor;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe((results) => {
      this.heroes = results["resolvedData"];
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  onSearch() {
    if (!this.heroName) return;
    //this.isLoading = true;
  }

  onHeroSelected(arg0: string) {
  }
}
