import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subject, takeUntil } from 'rxjs';
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

getMatchMapThumbnail(map_thumbnail: string) {
  const size = 'large';
  const modifiedPath = map_thumbnail.replace(/\/maps\//, `/maps/${size}/`);
  return `https://www.marvelrivalsapi.com/rivals/${modifiedPath}`;
}

  searchPlayerName: any;
  playerName: string = ''
  ngUnsubscribe = new Subject();
  matchHistory = signal<IMatchHistoryItem[] | []>([]);
  searchInput$ = new Subject<string>();
  isLoading = signal<boolean>(false);
  sub: any;

  constructor(private activatedRoute: ActivatedRoute,
    private matchHistoryService: MatchHistoryService,
    private router: Router, private playerSearchService: PlayerSearchService,
    private playerTitleService: PlayerTitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe({
        next: (response) => {
          this.setPlayerHistory(response["resolvedData"]);
        }
      });
    this.playerSearchService.playerSearch$.subscribe(nickName => {
      this.onSearchInput(nickName);
    })
  }

  getGameMode(gameModeId: number) {
    // Implement your logic to get the game mode name based on the ID
    switch (gameModeId) {
      case 1: return 'Quick Play';
      case 2: return 'Competitive';
      case 3: return 'Doom';
      case 4: return 'Arcade';
      default: return 'Unknown';
    }
  }

  setPlayerHistory(matchHistoryResponse: any) {
    this.playerName = matchHistoryResponse[0]?.match_player.playerName || 'Unknown Player';
    this.playerTitleService.setPlayerName(this.playerName);
    this.matchHistory.set(matchHistoryResponse);
  }

  fetchPlayerHistory(searchPlayerName: any) {
    this.router.navigate(['./'], { relativeTo: this.activatedRoute });
    this.isLoading.set(true); // Assuming you have a loading state to show
    this.matchHistoryService.getPlayerHistory(searchPlayerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.setPlayerHistory(response);
          this.isLoading.set(false);
        },
        error: () => {
          this.matchHistory.set([]);
          this.isLoading.set(false);
        }
      });
  }
  
  onSearchInput(searchName: string) {
    const trimmedName = typeof searchName === 'string' ? searchName.trim() : '';
    if (trimmedName) {
      this.fetchPlayerHistory(trimmedName);
    }
  }

  onMatchClick(match: IMatchHistoryItem) {
    // Handle match click event, e.g., navigate to match details
    this.router.navigate(['match-details', match.match_uid, this.playerName], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.playerTitleService.clearPlayerName(); // <-- Add this line
  }
}