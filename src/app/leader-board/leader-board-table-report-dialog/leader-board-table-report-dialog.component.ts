import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHero } from 'src/app/heroes/hero/data/models/hero.model';
import { IHeroBoardPlayer } from '../data/models/hero-board-resolved-data';

@Component({
  selector: 'app-gridlist-dialog',
  standalone: false,
  templateUrl: "./leader-board-table-report-dialog.component.html",

})
export class LeaderBoardTableReportDialogComponent {
  hero: IHero =  this.data.selectedHero;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {selectedHero: IHero; players: IHeroBoardPlayer[]; }){}
}