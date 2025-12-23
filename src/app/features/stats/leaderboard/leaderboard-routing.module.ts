import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardResolver as LeaderboardResolver } from './services/leaderboard.resolver';

const routes: Routes = [
  { path: '', component: LeaderboardComponent, resolve:{ resolvedData: LeaderboardResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class LeaderboardRoutingModule { }
