import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IMatchHistoryItem } from './data/models/match-history.model';
import { MatchHistoryService } from './services/match-history.service';
import { PlayerSearchService } from '../shared/services/player-search-service';
import { PlayerTitleService } from '../shared/services/player-title-service';
import { GameMapsService } from '../game-maps/services/game-maps.service';
import { IGameMap } from '../game-maps/data/game-maps.model';

@Component({
  selector: 'mr-match-history',
  standalone: false,
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.scss'
})
export class MatchHistoryComponent implements OnInit, OnDestroy {

  searchPlayerName: any;
  playerName: string = ''
  ngUnsubscribe = new Subject();
  matchHistory = signal<IMatchHistoryItem[] | []>([]);
  searchInput$ = new Subject<string>();
  isLoading = signal<boolean>(false);

  constructor(private activatedRoute: ActivatedRoute,
    private matchHistoryService: MatchHistoryService,
    private router: Router, private playerSearchService: PlayerSearchService,
    private playerTitleService: PlayerTitleService, 
    private gameMapsService: GameMapsService // Assuming you have a service to get game maps, replace with actual service
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.ngUnsubscribe)).subscribe({
        next: (response) => {
          this.setPlayerHistory(response["resolvedData"]);
        }
      });

    this.searchInput$
      .pipe(
        debounceTime(400), // 400ms delay after user stops typing
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((searchName) => {
        const trimmedName = typeof searchName === 'string' ? searchName.trim() : '';
        if (trimmedName) {
          this.fetchPlayerHistory(trimmedName);
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

  getMapThumbnail(map_id: number) {
   const map = this.gameMapsService.getMap(map_id);
   if (!map) {
     return ''; // or a default image path if you prefer
   }
   let mapImagePath = this.getImageUrlBySize(map, 'large');
   return "https://www.marvelrivalsapi.com/" + mapImagePath;
  }
  
  private getImageUrlBySize(map: IGameMap,  size: string) {
    return map ? (function () {
      switch (size) {
        case 'small': return map.images[0];
        case 'medium': return map.images[1];
        case 'large': return map.images[2];
        case 'x-large': return map.images[3];
        default: return map.images[0];
      }
    })() : undefined;
  }

  setPlayerHistory(matchHistoryResponse: any) {
    this.playerName = matchHistoryResponse.playerName;
    this.playerTitleService.setPlayerName(this.playerName);
    this.matchHistory.set(matchHistoryResponse.match_history);
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
          this.setPlayerHistory(response);
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