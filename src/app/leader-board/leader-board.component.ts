import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHeroBoardPlayer, IHeroBoardResponse } from './data/models/hero-board-resolved-data';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardTableReportComponent } from "./leader-board-table-report/leader-board-table-report.component";
import { HeroBoardService } from './services/hero-board.service';

import { LeaderBoardTableReportDialogComponent } from './leader-board-table-report-dialog/leader-board-table-report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getImageUrl, getFallbackImageUrl } from 'src/app/shared/utilities/image-utils';
import { HeroService } from '../heroes/heroes-list/services/hero.service';
import { IHero } from '../heroes/hero/data/models/hero-resolved-data';

@Component({
  selector: 'mr-hero-board',
  standalone: false,
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent implements OnInit, OnDestroy {
  players: IHeroBoardPlayer[] = []
  heroes: IHero[] = [];
  selectedHero: IHero | undefined;
  isLoading: boolean = false;
  heroName: string = '';
  getImageUrl = getImageUrl;
  ngUnsubscribe = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private heroBoardService: HeroBoardService, 
    private heroService: HeroService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((results) => results["resolvedData"] as IHeroBoardPlayer[])
      )
      .subscribe((players) => {
        this.players = players;
        this.heroService.getHeroes().subscribe({
          next: (response: IHero[]) =>{
            this.heroes = response;
          }
        });
      });
  }

  onSearch() {
    if (!this.heroName) return;
    this.isLoading = true;
    //Fetch players for the searched hero
    this.fetchPlayers(this.heroName);
    // Retrieve searched hero details
    this.fetchHeroDetails(this.heroName);
    this.openGridlistModal();

  }

  fetchHeroDetails(heroName: string) {
    for (let hero of this.heroes) {
      if (hero.name.toLowerCase() === heroName.toLowerCase()) {
        this.selectedHero = hero;
        break;
      }
    } 
  };

  fetchPlayers(heroName: string) {
    this.heroBoardService.getPlayers(heroName).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (response) => {
        this.players = response.players;
        this.isLoading = false;
      },
      error: () => {
        this.players = [];
        this.isLoading = false;
        this.selectedHero = undefined;
      }
    });
  }

  openGridlistModal() {
    this.dialog.open(LeaderBoardTableReportDialogComponent, {
      width: '80vw',
      data: { players: this.players, selectedHero: this.selectedHero }
    });
  }

  onHeroSelected(value : string){
    this.fetchPlayers(value);
    this.fetchHeroDetails(value);
    this.openGridlistModal();

  }

    ngOnDestroy(): void {
      this.ngUnsubscribe.next(null);
      this.ngUnsubscribe.complete();
  }

}