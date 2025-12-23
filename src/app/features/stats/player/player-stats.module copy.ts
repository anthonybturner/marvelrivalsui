import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PlayerStatsComponent } from './player-stats.component';
import { PlayerStatsRoutingModule } from './player-stats-routing.module';
import { PlayerInfoStats } from './player-info/player-info-stats/player-info-stats';
import { OverallInfoStats } from './overall-stats/overall-info-stats/overall-info-stats';
import { RankSeasonStats } from './rank-season-stats/rank-season-stats/rank-season-stats';
import { TopHeroStats } from './top-hero-stats/top-hero-stats/top-hero-stats';

@NgModule({
  declarations: [
    PlayerStatsComponent,
    PlayerInfoStats,
    OverallInfoStats,
    RankSeasonStats,
    TopHeroStats,
  ],

  imports: [
    PlayerStatsRoutingModule,
    SharedModule,
    FormsModule,
    ScrollingModule
  ],
  exports: [
    PlayerStatsComponent
  ]
})
export class PlayerStatsModule { }