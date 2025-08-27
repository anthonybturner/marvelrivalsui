import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailsComponent } from './match-history/match-details/match-details.component';

const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { pageTitle: 'Dashboard' }
  },
    {
    path: 'dev-diaries',
    loadChildren: () => import('./dev-diaries/dev-diaries.module').then(m => m.DevDiariesModule),
    data: { pageTitle: 'Dev Diaries' }
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
    data: { pageTitle: 'News' }
  },
  {
    path: 'maps',
    loadChildren: () => import('./game-maps/game-maps.module').then(m => m.GameMapsModule),
    data: { pageTitle: 'Game Maps' }
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    data: { pageTitle: 'Heroes' }
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
    data: { pageTitle: 'Leaderboards' }
  },
  {
    path: 'match-history',
    loadChildren: () => import('./match-history/match-history.module').then(m => m.MatchHistoryModule),
    data: { pageTitle: 'Match History' }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboards',
    data: { pageTitle: 'Redirect to DashBoard' }
  },
  {
    path: '**',
    redirectTo: 'dashboards',
    data: { pageTitle: 'Invalid Route Redirect' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class AppRoutingModule { }