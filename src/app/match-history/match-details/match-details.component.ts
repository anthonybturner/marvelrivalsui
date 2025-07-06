import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatchDetails } from '../data/models/match-details.model';
import { MatchDetailsService } from '../services/match-details.service';
import { Subscription } from 'rxjs';
import { PlayerSearchService } from 'src/app/shared/services/player-search-service';
import { ColDef } from 'ag-grid-community';
import { PlayerTitleService } from 'src/app/shared/services/player-title-service';
import { themeBalham, themeQuartz, themeAlpine, themeMaterial, colorSchemeDark } from 'ag-grid-community';


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
  isLoading: boolean = false;

columnDefs: ColDef[] = [
  { headerName: 'Name', field: 'nick_name', cellRenderer: (params: any) => { const a = document.createElement('a'); a.href = '#'; a.textContent = params.value; a.onclick = (event: MouseEvent) => { event.preventDefault(); params.context.componentParent.searchPlayer(params.value)};return a;}},
  { headerName: 'Camp', field: 'camp' },
  { headerName: 'Win', field: 'is_win', valueFormatter: params => params.value ? 'Victory' : 'Defeat' },
  { headerName: 'Hero', field: 'cur_hero_icon', cellRenderer: (params: any) => `<img src="https://marvelrivalsapi.com/rivals/${params.value}" class="hero-icon" />` },
  { headerName: 'K', field: 'kills' },
  { headerName: 'D', field: 'deaths' },
  { headerName: 'A', field: 'assists' },
  { headerName: 'Hero Damage', field: 'total_hero_damage', valueFormatter: params => Math.round(params.value).toString() },
  { headerName: 'Hero Heal', field: 'total_hero_heal', valueFormatter: params => Math.round(params.value).toString() },
  { headerName: 'Damage Taken', field: 'total_damage_taken', valueFormatter: params => Math.round(params.value).toString() },
  // For "Heroes Played", you may want a custom cellRenderer
];


  private sub!: Subscription;
  private currentPlayerName: string = '';
  public theme = themeQuartz.withPart(colorSchemeDark).withParams({
        backgroundColor: '#23272a',
        accentColor: 'red',
  });

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private matchDetailsService: MatchDetailsService, 
    private playerSearchService: PlayerSearchService,
    private playerTitleService: PlayerTitleService) { }
  
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  ngOnInit() {
    // Initialize matchId or any other logic needed when the component is initialized
    this.sub = this.route.paramMap.subscribe(params => {
      const matchUid = params.get('match_uid') || '';
      if (matchUid) {
        this.loadMatchDetails(matchUid);
      }
    });

    this.playerTitleService.playerName$.subscribe( (playerName: string) =>{
      this.currentPlayerName = playerName;
    });
  }

  getRowClass = (params: any) => {
    let cssClass = '';
    if (!params.data) return '';
    if(params.data.nick_name === this.currentPlayerName) cssClass = 'selected-player ';
    if(params.data.is_win) {cssClass += 'victory-row';}
    else{cssClass += 'defeat-row';}
    return cssClass;
  }

  searchPlayer(nick_name: string) {
    this.playerSearchService.searchPlayer(nick_name);
  }

  loadMatchDetails(matchUid: string) {
    this.isLoading = true;
    this.matchDetailsService.getMatchDetails(matchUid).subscribe({
      next: (response) => { 
        this.rowData.set(response.match_details); 
        this.isLoading = false; 
      },
      error: (error) => { 
        this.errorLoading = true; 
        this.errorMessage = error.message; 
        this.isLoading = false; 
      }
    });
  }

    onBack() {
      // Implement navigation logic to go back to the previous page
    this.router.navigate(['/match-history'], { relativeTo: this.route });
  }
}