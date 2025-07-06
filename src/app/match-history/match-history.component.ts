import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IMatchHistoryItem } from './data/models/match-history.model';
import { MatchHistoryService } from './services/match-history.service';
import { PlayerSearchService } from '../shared/services/player-search-service';
import { PlayerTitleService } from '../shared/services/player-title-service';

@Component({
  selector: 'mr-match-history',
  standalone: false,
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.scss'
})
export class MatchHistoryComponent implements OnInit, OnDestroy {

  searchPlayerName: any;
  playerName: string = ''
  constructor(private activatedRoute: ActivatedRoute, 
    private matchHistoryService: MatchHistoryService, 
    private router: Router, private playerSearchService: PlayerSearchService,
    private playerTitleService: PlayerTitleService
  ) { }
  ngUnsubscribe = new Subject();
  matchHistory = signal<IMatchHistoryItem[] | []>([]);
  searchInput$ = new Subject<string>();
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe({
        next: (response) => {
          const matchHistoryResponse = response["resolvedData"];
          this.playerName = matchHistoryResponse.playerName;
          this.playerTitleService.setPlayerName(this.playerName);
          this.matchHistory.set(matchHistoryResponse.match_history);
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

      this.playerSearchService.playerSearch$.subscribe(nickName => {
         this.onSearchInput(nickName);
      })
  }

  onSearchInput(value: string) {
    this.searchInput$.next(value);
  }

  fetchPlayerHistory(searchPlayerName: any) {
      this.router.navigate(['./'], { relativeTo: this.activatedRoute });
    this.isLoading.set(true); // Assuming you have a loading state to show
    this.matchHistoryService.getPlayerHistory(searchPlayerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.playerName = response.playerName || searchPlayerName;
          this.playerTitleService.setPlayerName(this.playerName);
          this.matchHistory.set(response.match_history);
          this.isLoading.set(false);
        },
        error: () => {
          this.matchHistory.set([]);
          this.isLoading.set(false);
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