import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHero } from 'src/app/heroes/hero/data/models/hero.model';
import { ILeaderBoardPlayer } from '../../data/models/leaderboard.model';

@Component({
  selector: 'app-gridlist-dialog',
  standalone: false,
  templateUrl: "./leaderboard-grid-report-dialog.component.html",

})
export class LeaderBoardGridReportDialogComponent {
  player: ILeaderBoardPlayer =  this.data.selectedPlayer;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {selectedPlayer: ILeaderBoardPlayer; players: ILeaderBoardPlayer[]; }){}
}