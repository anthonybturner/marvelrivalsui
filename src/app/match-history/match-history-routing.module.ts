import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchHistoryComponent } from './match-history.component';
import { MatchHistoryResolver } from './services/match-history-resolver';
import { MatchDetailsComponent } from './match-details/match-details.component';

const routes: Routes = [
  { path: '', 
    component: MatchHistoryComponent, 
    resolve: { resolvedData: MatchHistoryResolver } ,
    children: [
      {
        path: 'match-details/:match_uid',
        component: MatchDetailsComponent,
        data: { pageTitle: 'Player Match Details' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class MatchHistoryRoutingModule { }
