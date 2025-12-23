import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatchDetails } from '../data/models/match-details.model';
import { MatchDetailsService } from '../services/match-details.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { PlayerSearchService } from 'src/app/shared/services/player-search-service';
import { ColDef } from 'ag-grid-community';
import { PlayerTitleService } from 'src/app/shared/services/player-title-service';
import {  themeQuartz, colorSchemeDark } from 'ag-grid-community';
import { MatchHistoryService } from '../services/match-history.service';

@Component({
  selector: 'mr-match-details',
  standalone: false,  
  templateUrl: './match-details.component.html',
  styleUrl: './match-details.component.scss'
})
export class MatchDetailsComponent implements OnInit, OnDestroy {
  rowData = signal<IMatchDetails | undefined>(undefined); // Replace with the actual type for match details
  errorLoading: boolean = false;
  errorMessage: string = '';
  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'nick_name', cellRenderer: (params: any) => { const a = document.createElement('a'); a.href = '#'; a.textContent = params.value; a.onclick = (event: MouseEvent) => { event.preventDefault(); params.context.componentParent.searchPlayer(params.data.player_uid, params.value) }; return a; } },
    { headerName: 'Camp', field: 'camp' },
    { headerName: 'Win', field: 'is_win', valueFormatter: params => params.value ? 'Victory' : 'Defeat' },
    { headerName: 'Hero', field: 'cur_hero_icon', cellRenderer: (params: any) => `<img src="https://marvelrivalsapi.com/rivals/${params.value}" class="hero-icon" />` },
    { headerName: 'K', field: 'kills' },
    { headerName: 'D', field: 'deaths' },
    { headerName: 'A', field: 'assists' },
    { headerName: 'Hero Damage', field: 'total_hero_damage', valueFormatter: params => Math.round(params.value).toString() },
    { headerName: 'Hero Heal', field: 'total_hero_heal', valueFormatter: params => Math.round(params.value).toString() },
    { headerName: 'Damage Taken', field: 'total_damage_taken', valueFormatter: params => Math.round(params.value).toString() },
  ];

  private sub!: Subscription;
  currentPlayerName: string = '';
  public selectedMapImage: string = ''; // Define the type based on your map data structure

  public theme = themeQuartz.withPart(colorSchemeDark).withParams({backgroundColor: '#23272a',accentColor: 'red',});
  isLoading = signal<boolean>(false);
  ngUnsubscribe = new Subject();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private matchDetailsService: MatchDetailsService,
    private playerTitleService: PlayerTitleService,
    private matchHistoryService: MatchHistoryService

  ) { }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  ngOnInit() {
    // Initialize matchId or any other logic needed when the component is initialized
    this.sub = this.route.paramMap.subscribe(params => {
      const matchUid = params.get('match_uid') || '';
      const playerName = params.get('player_name') || '';
      if (matchUid) {
        this.loadMatchDetails(matchUid);
        this.getMatchMapInfo(matchUid, playerName);
      }
    });
   
    this.playerTitleService.playerName$.subscribe((playerName: string) => {
      this.currentPlayerName = playerName;
    });
  }
  
  getMatchMapInfo(matchUid: string, searchPlayerName: string) {
    this.matchHistoryService.getPlayerHistory(searchPlayerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.selectedMapImage = response.find(match => match.match_uid === matchUid)?.map_thumbnail ?? '';
        },
        error: () => {
          this.selectedMapImage = '';
        }
      });
  }

  getRowClass = (params: any) => {
    let cssClass = '';
    if (!params.data) return '';
    if (params.data.nick_name === this.currentPlayerName) cssClass = 'selected-player ';
    if (params.data.is_win) { cssClass += 'victory-row'; }
    else { cssClass += 'defeat-row'; }
    return cssClass;
  }

  searchPlayer(playerUid: string, playerName: string) {
    // Navigate to the match-history page for the searched player using an absolute path
    this.router.navigate(['/match-history', playerUid, playerName], { relativeTo: this.route.parent });
  }

  fetchPlayerHistory(searchPlayerName: any) {
    //this.router.navigate(['./'], { relativeTo: this.activatedRoute });
    this.isLoading.set(true); // Assuming you have a loading state to show
    this.matchHistoryService.getPlayerHistory(searchPlayerName)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.matchHistoryService.matchHistoryUpdated$.next(response);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);  
        }
      });
  }

  loadMatchDetails(matchUid: string) {
    this.matchDetailsService.getMatchDetails(matchUid).subscribe({
      next: (response) => {
        this.rowData.set(response.match_details);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorLoading = true;
        this.errorMessage = error.message;
        this.isLoading.set(false);
      }
    });
  }

  onBack() {
    // Implement navigation logic to go back to the previous page
    this.router.navigate(['/match-history'], { relativeTo: this.route });
  }
}