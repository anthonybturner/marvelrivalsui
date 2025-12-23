import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatchHistoryComponent } from './match-history.component';
import { MatchHistoryRoutingModule } from './match-history-routing.module';
import { FormsModule } from '@angular/forms';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchDetailsPlaceholderComponent } from './match-details/match-details-placeholder-component/match-details-placeholder-component';
import { AgGridModule } from 'ag-grid-angular';
import { ClientSideRowModelModule, ModuleRegistry, RowStyleModule } from 'ag-grid-community';

@NgModule({
  declarations: [MatchHistoryComponent, MatchDetailsComponent, MatchDetailsPlaceholderComponent],
  imports: [
    SharedModule,
    FormsModule,
    MatchHistoryRoutingModule,
    AgGridModule
  ],
  exports:[
    MatchHistoryComponent
  ]
})
export class MatchHistoryModule { 
constructor() {
    ModuleRegistry.registerModules([
      RowStyleModule,
      ClientSideRowModelModule,
    ]);
  }
}
