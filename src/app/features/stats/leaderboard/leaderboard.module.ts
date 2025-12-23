import { NgModule } from '@angular/core';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderBoardGridReportComponent } from './leaderboard-grid-report/leaderboard-grid-report.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { LeaderboardGridReportDialogComponent } from './leaderboard-grid-report/leaderboard-grid-report-dialog/leaderboard-grid-report-dialog.component';
import { LeaderboardComponent } from './leaderboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClientSideRowModelModule, ModuleRegistry, RowStyleModule } from 'ag-grid-community';
import {IntegratedChartsModule} from 'ag-grid-enterprise';

import { AgChartsCommunityModule } from 'ag-charts-community';
import { LeaderboardTableComponent } from './leaderboard-table/leaderboard-table.component';

@NgModule({
  declarations: [
    LeaderboardComponent,
    LeaderBoardGridReportComponent,
    LeaderboardGridReportDialogComponent,
    LeaderboardTableComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    LeaderboardRoutingModule,
    AgGridModule,

  ]
})

export class LeaderboardModule {
  constructor() {
    ModuleRegistry.registerModules([
      RowStyleModule,
      ClientSideRowModelModule
    ]);
  }
}