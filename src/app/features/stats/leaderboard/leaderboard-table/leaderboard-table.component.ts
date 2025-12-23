import { Component, Input } from '@angular/core';
import { ILeaderBoardPlayer as ILeaderboardPlayer } from '../data/models/leaderboard.model';
import { getPlayerImage } from 'src/app/shared/utilities/image-utils';
import { LeaderboardGridReportDialogComponent } from '../leaderboard-grid-report/leaderboard-grid-report-dialog/leaderboard-grid-report-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mr-leaderboard-table',
  standalone: false,
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.scss'
})
export class LeaderboardTableComponent {

  private _players: ILeaderboardPlayer[] = [];
  filteredPlayers: ILeaderboardPlayer[] = [];
  searchTerm: string = '';
  allPlayers: ILeaderboardPlayer[] = []; // Store the original list
  sortColumn: string = 'rank';
  sortAscending: boolean = false;
  getPlayerImage = getPlayerImage;
  displayedColumns: string[] = [
    'rank', 'player', 'level', 'matches', 'wins', 'losses', 'winRate', 'kda', 'kills', 'deaths', 'assists'
  ];

  @Input()
  set players(value: ILeaderboardPlayer[]) {
    this._players = value || [];
    this.allPlayers = this._players;
    this.applyFilter();
  }
  
  constructor(private dialog: MatDialog) {}

  get players(): ILeaderboardPlayer[] {
    return this._players;
  }

  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredPlayers = [...this.allPlayers];
    } else {
      this.filteredPlayers = this.allPlayers.filter(player =>
        player.info.name.toLowerCase().includes(term)
      );
    }
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = false;
    }
    this.players = [...this.players].sort((a, b) => {
      let aValue = this.getSortValue(a, column);
      let bValue = this.getSortValue(b, column);

      if (aValue < bValue) return this.sortAscending ? -1 : 1;
      if (aValue > bValue) return this.sortAscending ? 1 : -1;
      return 0;
    });
  }
  getSortValue(player: ILeaderboardPlayer, column: string): any {
    switch (column) {
      case 'rank':
        return player.info.rank_season.rank_score
      case 'player':
        return player.info.name;
      case 'level':
        return player.info.rank_season.level;
      case 'matches':
        return player.matches;
      case 'wins':
        return player.wins;
      case 'losses':
        return (player.matches - player.wins);
      case 'winRate':
        return player.matches ? player.wins / player.matches : 0;
      case 'kda':
        return (player.kills + player.assists) / Math.max(1, player.deaths);
      case 'kills':
        return player.kills;
      case 'deaths':
        return player.deaths;
      case 'assists':
        return player.assists;
      default:
        return '';
    }
  }
  openGridlistModal(player: ILeaderboardPlayer) {
    this.dialog.open(LeaderboardGridReportDialogComponent, {
      width: '80vw',
      data: { players: this.players, selectedPlayer: player }
    });
  }

  onPlayerClick(player: any) {
    this.openGridlistModal(player);
  }

}
