import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroBoardRoutingModule } from './leader-board-routing.module';
import { LeaderBoardTableReportComponent } from './leader-board-table-report/leader-board-table-report.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { LeaderBoardTableReportDialogComponent } from './leader-board-table-report-dialog/leader-board-table-report-dialog.component';
import { LeaderBoardDetailsCardComponent } from './leader-board-details-card/leader-board-details-card.component';
import { LeaderBoardComponent } from './leader-board.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClientSideRowModelModule, ModuleRegistry, RowStyleModule } from 'ag-grid-community';
import {IntegratedChartsModule} from 'ag-grid-enterprise';

import { AgChartsCommunityModule } from 'ag-charts-community';

@NgModule({
  declarations: [
    LeaderBoardComponent,
    LeaderBoardTableReportComponent,
    LeaderBoardTableReportDialogComponent,
    LeaderBoardDetailsCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroBoardRoutingModule,
    AgGridModule,
    SharedModule

  ]
})

export class HeroBoardModule {
  constructor() {
    ModuleRegistry.registerModules([
      IntegratedChartsModule.with(AgChartsCommunityModule),
      RowStyleModule,
      ClientSideRowModelModule
    ]);
  }


}
