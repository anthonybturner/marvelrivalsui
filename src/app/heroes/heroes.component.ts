import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHero } from './hero/data/models/hero.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { handleImageError, getImageUrl, getRoleColor } from '../shared/utilities/image-utils';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { HeroDetailsCardComponent } from './hero/hero-details-card/hero-details-card.component';
import { HeroesService } from './services/heroes.service';
@Component({
  selector: 'mr-hero',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  imports: [FormsModule, MaterialModule, HeroDetailsCardComponent]
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes = signal<IHero[]>([]);
  selectedHero: IHero | null = null;
  heroName = signal<string>('');
  isLoading: boolean = false;
  searchTerm = signal<string>('');
  ngUnsubscribe = new Subject();

  handleImageError = handleImageError;
  getImageUrl = getImageUrl;
  getRoleColor = getRoleColor;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((results) => {
      this.heroes.set(results);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  filteredHeroes = computed(()=>{
    const term = this.searchTerm().trim().toLowerCase();
    return this.heroes().filter(hero =>hero.name.toLowerCase().includes(term))
  });

  onHeroSelected(hero: string){

  }

  selectHero(hero: IHero) {
    this.selectedHero = hero;
  }
}
