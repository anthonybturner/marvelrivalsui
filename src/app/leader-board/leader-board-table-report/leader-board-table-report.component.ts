import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ColDef, Module } from 'ag-grid-community';

import { AgGridAngular } from 'ag-grid-angular';
import { ClientSideRowModelModule, ModuleRegistry, RowStyleModule } from 'ag-grid-community';
import {IntegratedChartsModule} from 'ag-grid-enterprise';
import { AgChartsCommunityModule } from 'ag-charts-community';

import { Subject, takeUntil } from 'rxjs';
import { IHeroBoardPlayer } from '../data/models/hero-board.model';

@Component({
  selector: 'mr-heroboard-gridlist',
  standalone: false,
  templateUrl: './leader-board-table-report.component.html',
  styleUrl: './leader-board-table-report.component.scss'
})
export class LeaderBoardTableReportComponent implements OnInit, OnDestroy {

  @ViewChild('agGrid', { static: true }) agGrid!: AgGridAngular;
  
  columnDefs: ColDef[] = [];
  @Input() rowData: IHeroBoardPlayer[] = [];

  ngUnsubscribe = new Subject();
  isLoading: boolean = false;
  
  modules: Module[] = [
    ClientSideRowModelModule,
    RowStyleModule,
    IntegratedChartsModule.with(AgChartsCommunityModule)
  ];
  
  rowClassRules = {
    'ag-row-even': (params: any) => params.node.rowIndex % 2 === 0,
    'ag-row-odd': (params: any) => params.node.rowIndex % 2 !== 0
  };


  constructor(private activatedRoute: ActivatedRoute){

  }

   ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowData'] && this.rowData) {
       this.rowData = this.rowData.map(row => {
      const rank_score = row.info?.rank_season?.rank_score;
      const max_rank_score = row.info?.rank_season?.max_rank_score;
      const win_count = row.info?.rank_season?.win_count;
      const mapped = { ...row, rank_score, max_rank_score, win_count  };
      return mapped;
    });
    }
  }

  ngOnInit(): void{
      // Column Definitions: Defines the columns to be displayed.
      this.setColumnDefs();
      this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((results) =>{});
  }


  onGridReady(params: any) {
    this.agGrid.api = params.api;
  }


  createBarChart() {
    this.agGrid.api.createRangeChart({
      cellRange: {
        columns: ['wins', 'win_count', 'rank_score', 'max_rank_score']
      },
      chartType: 'pie'
    });
  }

  public gridOptions = {
    rowStyle: { }, // optional, for custom base style
  };

  getRowClass(params: any): string {
    return params.node.rowIndex % 2 === 0 ? 'ag-row-even' : 'ag-row-odd';
  }
        
  private setColumnDefs() {
    this.columnDefs = [
      { headerName: "Name", valueGetter: params => params.data.info?.name },
      //{ headerName: "Icon ID", valueGetter: params => params.data.info?.cur_head_icon_id },
     // { headerName: "Player UID", field: "player_uid" },
      { headerName: "Rnk-Lvl", valueGetter: params => params.data.info.rank_season.level },
      { headerName: "Rnk-Max Lvl", valueGetter: params => params.data.info.rank_season.max_level },
      { headerName: "Rnk-Score", field: "rank_score" },
      { headerName: "Rnk-Score Max", field: "max_rank_score" },
      { headerName: "Rnk-Win Count", field: "win_count" },
      { headerName: "Matches", field: "matches" },
      { headerName: "Wins", field: "wins" },
      { headerName: "Win Rate", valueGetter: params => params.data.matches ? (params.data.wins / params.data.matches).toFixed(2) : "0" },
      { headerName: "Final Hits", field: "kills" },
      { headerName: "Deaths", field: "deaths" },
      { headerName: "Assists", field: "assists" },
      { headerName: "Play Time", field: "play_time" },
      { headerName: "Total Hero Damage", field: "total_hero_damage" },
      { headerName: "Total Damage Taken", field: "total_damage_taken" },
      { headerName: "Total Hero Heal", field: "total_hero_heal" },
      { headerName: "MVPs", field: "mvps" },
      { headerName: "SVPs", field: "svps" },
    ];
  }

  ngOnDestroy(): void {
    
  }

}