import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatchHistoryService } from './match-history-service' // Adjust the import path
import { IMatchHistory, IMatchHistoryResponse } from './match-history.model';  // Adjust the import path
import { ActivatedRoute } from '@angular/router';
import { MatchHistoryResolvedData } from './match-history.resolver';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss'],
  standalone: false,
})
export class MatchHistoryComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['season','game_mode', 'match_time_stamp', 'player_hero_name','player_hero_kills', 'player_hero_deaths', 'player_hero_assists', 'player_hero_damage', 'duration', 'kills', 'deaths', 'assists', 'damage'];
  dataSource: MatTableDataSource<MatchHistoryResolvedData> = new MatTableDataSource();  // Initialize with an empty dataSource
  matchHistory: IMatchHistory[] = [];  // Store the array of match history
  ngUnsubscribe = new Subject();  // Subject to manage unsubscription
  
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((results)=>{
        this.dataSource.data = results['resolvedData'];
      });      
  }

  getGameModeLabel(gameModeId: number): string {
    switch (gameModeId) {
      case 2:
        return 'Ranked';
      case 1:
        return 'Quick Match';
      default:
        return 'Unknown';
    }
  }

  viewMatchDetails() {}


  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);  // Emit a value to complete the subject
    this.ngUnsubscribe.complete();  // Complete the subject to prevent memory leaks
  }

}
