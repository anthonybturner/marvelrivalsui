import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchHistoryComponent } from './match-history.component';
import { MatchHistoryResolver } from './services/match-history-resolver';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchDetailsPlaceholderComponent } from './match-details/match-details-placeholder-component/match-details-placeholder-component';

const routes: Routes = [
   { path: ':player_uid/:player_name', 
    component: MatchHistoryComponent, 
    resolve: { resolvedData: MatchHistoryResolver } ,
    children: [
      {
        path: '',
        component: MatchDetailsPlaceholderComponent // <--- default right panel
      },
      {
        path: 'match-details/:match_uid/:player_name', // <--- match details route
        component: MatchDetailsComponent,
        data: { pageTitle: 'Match History' }
      }
    ]
  },
  { path: '', 
    component: MatchHistoryComponent, 
    resolve: { resolvedData: MatchHistoryResolver } ,
    children: [
      {
        path: '',
        component: MatchDetailsPlaceholderComponent // <--- default right panel
      },
       {
        path: 'match-details/:match_uid/:player_name', // <--- match details route
        component: MatchDetailsComponent,
        data: { pageTitle: 'Match History' }
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class MatchHistoryRoutingModule { }
