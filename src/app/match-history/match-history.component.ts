import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
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

  constructor(private activatedRoute: ActivatedRoute, private matchHistoryService: MatchHistoryService, private router: Router) { }
  ngUnsubscribe = new Subject();
  matchHistory: IMatchHistoryItem[] | undefined;

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe({
        next: (response) => {
          const matchHistoryResponse = response["resolvedData"];
          this.searchPlayerName = matchHistoryResponse.playerName;
          this.matchHistory = matchHistoryResponse.match_history;
        }
      });
  }

  onSearch() {
    if (!this.searchPlayerName) return;
    this.fetchPlayerHistory(this.searchPlayerName);
  }

  fetchPlayerHistory(searchPlayerName: any) {
    this.matchHistoryService.getPlayerHistory(this.searchPlayerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.searchPlayerName = response.playerName;
          this.matchHistory = response.match_history;
          tap((results: any) => console.log(results))
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