import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderBoardComponent } from './leaderboard.component';
import { LeaderBoardResolver as LeaderBoardResolver } from './services/leaderboard.resolver';

const routes: Routes = [
  { path: '', component: LeaderBoardComponent, resolve:{ resolvedData: LeaderBoardResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class HeroBoardRoutingModule { }
