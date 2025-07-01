import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatchHistoryComponent } from './match-history.component';
import { MatchHistoryRoutingModule } from './match-history-routing.module';
import { FormsModule } from '@angular/forms';
import { MatchDetailsComponent } from './match-details/match-details.component';

@NgModule({
  declarations: [MatchHistoryComponent, MatchDetailsComponent],
  imports: [
    SharedModule,
    FormsModule,
    MatchHistoryRoutingModule
  ],
  exports:[
    MatchHistoryComponent
  ]
})
export class MatchHistoryModule { }
