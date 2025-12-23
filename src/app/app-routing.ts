import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard'
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
    data: { pageTitle: 'Redirect to Dashboard' }
  },
  {
    path: '**',
    redirectTo: 'dashboards',
    data: { pageTitle: 'Invalid Route Redirect' }
  }
];