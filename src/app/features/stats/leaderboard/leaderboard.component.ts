import { Component, OnDestroy, OnInit, signal, effect, computed } from '@angular/core';
import { ILeaderBoardPlayer as ILeaderboardPlayer, ILeaderBoardResponse as ILeaderboardResponse } from './data/models/leaderboard.model';
import { finalize, map, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LeaderboardService as LeaderboardService } from './services/leaderboard.service';

import { getImageUrl, getPlayerImage } from 'src/app/shared/utilities/image-utils';
import { HeroesService } from '../heroes/services/heroes.service';
import { IHero } from '../heroes/hero/data/models/hero.model';

@Component({
  selector: 'mr-leaderboard',
  standalone: false,
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  players = signal<ILeaderboardPlayer[]>([]);
  selectedHero = signal<IHero | undefined>(undefined);
  searchHeroName = signal<string>('');
  heroName = signal<string>('');
  isLoading = signal<boolean>(false);
  ngUnsubscribe = new Subject();
  getImageUrl = getImageUrl;
  getPlayerImage = getPlayerImage;

  //Computed
  hasPlayers = computed( () => this.players().length > 0);
  displayHeroName = computed(() => this.heroName() || 'Unknown Hero');
  searchDisabled = computed(() => !this.searchHeroName().trim || this.isLoading());
  topPlayers = computed(() => this.players().slice(0, 10));
  playerCount = computed(() => this.players().length);

  constructor(private activatedRoute: ActivatedRoute, private leaderBoardService: LeaderboardService, private heroService: HeroesService) { 

    effect( () =>{//Automatically fetch hero info when heroName changes.
      const name = this.heroName();
      if(name){
        this.fetchHeroBannerInfo(name);
      }
    });
  }


  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((results) => results["resolvedData"] as ILeaderboardResponse)
      )
      .subscribe((results) => {
        this.players.set(results.players);
        this.heroName.set(results.hero_name);
      });
  }

  updateSearchHeroName(value: string){
    this.searchHeroName.set(value);
  }

  onSearch() {
    if (!this.searchHeroName()) return;
    this.fetchPlayers(this.searchHeroName());
  }

  fetchHeroBannerInfo(name: string) {
    this.isLoading.set(true);
    this.heroService.getHero(name.toLowerCase()).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
        next: (response) => {
          this.selectedHero.set(response);
        },
        error: (error) => {
          console.log("OnSearch: " + error);
        }
      });
  }

  fetchPlayers(heroName: string) {
    this.isLoading.set(true);
    this.leaderBoardService.getPlayers(heroName)
    .pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (response) => {
        this.players.set(response.players);
        this.heroName.set(heroName);
      },
      error: () => {
        this.players.set([]);
        this.selectedHero.set(undefined);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}