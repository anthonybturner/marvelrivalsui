import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { pageTitle: 'Dashboard' }
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
    data: { pageTitle: 'News' }
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
    data: { pageTitle: 'Player Match History' }
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