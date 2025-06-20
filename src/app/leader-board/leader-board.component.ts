import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHeroBoardPlayer } from './data/models/hero-board.model';
import {  map, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardService } from './services/leader-board.service';

import { LeaderBoardTableReportDialogComponent } from './leader-board-table-report-dialog/leader-board-table-report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getImageUrl, getFallbackImageUrl } from 'src/app/shared/utilities/image-utils';
import { HeroesService } from '../heroes/services/heroes.service';
import { IHero } from '../heroes/hero/data/models/hero.model';

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

  constructor(private activatedRoute: ActivatedRoute, private heroBoardService: LeaderBoardService, 
    private heroesService: HeroesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((results) => results["resolvedData"] as IHeroBoardPlayer[])
      )
      .subscribe((players) => {
        this.players = players;
        this.heroesService.getHeroes().subscribe({
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
    this.findSelectedHero(this.heroName);
    this.openGridlistModal();

  }

  findSelectedHero(selectedHeroName: string) {
    for (let hero of this.heroes) {
      if (hero.name.toLowerCase() === selectedHeroName.toLowerCase()) {
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
    this.findSelectedHero(value);
    this.openGridlistModal();

  }

    ngOnDestroy(): void {
      this.ngUnsubscribe.next(null);
      this.ngUnsubscribe.complete();
  }
}