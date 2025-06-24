import { NgModule } from '@angular/core';

import { HeroBoardRoutingModule } from './leaderboard-routing.module';
import { LeaderBoardGridReportComponent } from './leaderboard-grid-report/leaderboard-grid-report.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { LeaderBoardGridReportDialogComponent } from './leaderboard-grid-report/leaderboard-grid-report-dialog/leaderboard-grid-report-dialog.component';
import { LeaderBoardComponent } from './leaderboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClientSideRowModelModule, ModuleRegistry, RowStyleModule } from 'ag-grid-community';
import {IntegratedChartsModule} from 'ag-grid-enterprise';

import { AgChartsCommunityModule } from 'ag-charts-community';
import { LeaderBoardTableComponent } from './leaderboard-table/leaderboard-table.component';

@NgModule({
  declarations: [
    LeaderBoardComponent,
    LeaderBoardGridReportComponent,
    LeaderBoardGridReportDialogComponent,
    LeaderBoardTableComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    HeroBoardRoutingModule,
    AgGridModule,

  ]
})

export class LeaderBoardModule {
  constructor() {
    ModuleRegistry.registerModules([
      IntegratedChartsModule.with(AgChartsCommunityModule),
      RowStyleModule,
      ClientSideRowModelModule
    ]);
  }
}