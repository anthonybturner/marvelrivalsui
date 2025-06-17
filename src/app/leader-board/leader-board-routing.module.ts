import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderBoardComponent } from './leader-board.component';
import { HeroBoardResolver } from './services/hero-board.resolver';

const routes: Routes = [
  { path: '', component: LeaderBoardComponent, resolve:{ resolvedData: HeroBoardResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class HeroBoardRoutingModule { }
