import { Component, OnDestroy, OnInit } from '@angular/core';
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
  players: ILeaderboardPlayer[] = []

  selectedHero: IHero | undefined;
  searchHeroName: string = '';
  heroName: string = '';
  isLoading: boolean = false;

  getImageUrl = getImageUrl;
  getPlayerImage = getPlayerImage;

  ngUnsubscribe = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private leaderBoardService: LeaderboardService, private heroService: HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((results) => results["resolvedData"] as ILeaderboardResponse)
      )
      .subscribe((results) => {
        this.players = results.players;
        this.heroName = results.hero_name;
        this.fetchHeroBannerInfo(this.heroName);
      });
  }

  onSearch() {
    if (!this.searchHeroName) return;
    this.fetchPlayers(this.searchHeroName);
  }

  fetchHeroBannerInfo(name: string) {
    this.isLoading = true;
    this.heroService.getHero(name.toLowerCase()).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
        next: (response) => {
          this.selectedHero = response;
        },
        error: (error) => {
          console.log("OnSearch: " + error);
        }
      });
  }

  fetchPlayers(heroName: string) {
    this.isLoading = true;
    this.leaderBoardService.getPlayers(heroName)
    .pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        this.players = response.players;
        this.heroName = heroName;
        this.fetchHeroBannerInfo(heroName);
      },
      error: () => {
        this.players = [];
        this.selectedHero = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}