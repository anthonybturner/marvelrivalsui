import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IMatchHistoryItem } from './data/models/match-history.model';
import { MatchHistoryService } from './services/match-history.service';

@Component({
  selector: 'mr-match-history',
  standalone: false,
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.scss'
})
export class MatchHistoryComponent implements OnInit, OnDestroy {

  searchPlayerName: any;
  playerName: string = ''
  constructor(private activatedRoute: ActivatedRoute, private matchHistoryService: MatchHistoryService, private router: Router) { }
  ngUnsubscribe = new Subject();
  matchHistory: IMatchHistoryItem[] | undefined;
  searchInput$ = new Subject<string>();

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe({
        next: (response) => {
          const matchHistoryResponse = response["resolvedData"];
          this.playerName = matchHistoryResponse.playerName;
          this.matchHistory = matchHistoryResponse.match_history;
        }
      });

    this.searchInput$
      .pipe(
        debounceTime(400), // 400ms delay after user stops typing
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((value) => {
        if (value && value.trim()) {
          this.fetchPlayerHistory(value.trim());
        }
      });
  }

  onSearchInput(value: string) {
    this.searchInput$.next(value);
  }


  fetchPlayerHistory(searchPlayerName: any) {
    this.matchHistoryService.getPlayerHistory(this.searchPlayerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.playerName = response.playerName;
          this.matchHistory = response.match_history;
        },
        error: () => {
          this.matchHistory = [];
        }
      });
  }

  onMatchClick(match: IMatchHistoryItem) {
    // Handle match click event, e.g., navigate to match details
    this.router.navigate(['match-details', match.match_uid], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}