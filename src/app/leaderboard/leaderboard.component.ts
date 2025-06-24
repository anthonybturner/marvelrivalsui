import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILeaderBoardPlayer, ILeaderBoardResponse } from './data/models/leaderboard.model';
import { map, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardService } from './services/leaderboard.service';

import { LeaderBoardGridReportDialogComponent } from './leaderboard-grid-report/leaderboard-grid-report-dialog/leaderboard-grid-report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getImageUrl, getPlayerImage } from 'src/app/shared/utilities/image-utils';
import { HeroesService } from '../heroes/services/heroes.service';
import { IHero } from '../heroes/hero/data/models/hero.model';

@Component({
  selector: 'mr-leaderboard',
  standalone: false,
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderBoardComponent implements OnInit, OnDestroy {
  players: ILeaderBoardPlayer[] = []

  selectedHero: IHero | undefined;
  searchHeroName: string = '';
  heroName: string = '';
  isLoading: boolean = false;

  getImageUrl = getImageUrl;
  getPlayerImage = getPlayerImage;

  ngUnsubscribe = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private heroBoardService: LeaderBoardService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((results) => results["resolvedData"] as ILeaderBoardResponse)
      )
      .subscribe((results) => {
        this.players = results.players;
        this.heroName = results.hero_name;
      });
  }

  onSearch() {
    if (!this.searchHeroName) return;
    this.isLoading = true;
    this.fetchPlayers(this.searchHeroName);
  }

  fetchPlayers(heroName: string) {
    this.heroBoardService.getPlayers(heroName).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (response) => {
        this.players = response.players;
        this.heroName = heroName;
        this.isLoading = false;
      },
      error: () => {
        this.players = [];
        this.isLoading = false;
        this.selectedHero = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}