import { NgModule } from '@angular/core';

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
import { HeroDetailsCardComponent } from '../heroes/hero/hero-details-card/hero-details-card.component';

@NgModule({
  declarations: [
    LeaderBoardComponent,
    LeaderBoardDetailsCardComponent,
    LeaderBoardTableReportComponent,
    LeaderBoardTableReportDialogComponent,
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