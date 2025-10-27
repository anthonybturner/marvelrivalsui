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
  heroes: IHero[] = [];
  filteredHeroes: IHero[] = [];
  selectedHero: IHero | null = null;
  isLoading: boolean = false;
  searchTerm: string = '';
  ngUnsubscribe = new Subject();

  handleImageError = handleImageError;
  getImageUrl = getImageUrl;
  getRoleColor = getRoleColor;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe((results) => {
      this.heroes = results["resolvedData"];
      this.filteredHeroes = this.heroes;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredHeroes = this.heroes;
      return;
    }
    this.filteredHeroes = this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(term)
    );
  }

  selectHero(hero: IHero) {
    this.selectedHero = hero;
  }
}
