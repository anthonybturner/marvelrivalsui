import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerStatsComponent } from './player-stats.component';
import { PlayerStatsResolver } from './services/player-stats-resolver';

const routes: Routes = [
  { path: '', component: PlayerStatsComponent, resolve:{ resolvedData: PlayerStatsResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class PlayerStatsRoutingModule { }
