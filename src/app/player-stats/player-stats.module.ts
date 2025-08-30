import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PlayerStatsComponent } from './player-stats.component';
import { PlayerStatsRoutingModule } from './player-stats-routing.module';

@NgModule({
  declarations: [
    PlayerStatsComponent,
  ],
  
  imports: [
    PlayerStatsRoutingModule,
    SharedModule,
    FormsModule,
    ScrollingModule
],
exports:[
    PlayerStatsComponent
]
})
export class PlayerStatsModule { }