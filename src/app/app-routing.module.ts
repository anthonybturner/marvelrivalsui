import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchDetailsComponent } from './match-history/match-details/match-details.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: { pageTitle: 'Authentication' }
  },

  {
    path: 'home',
    redirectTo: 'dashboards',
    pathMatch: 'full'
  },
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { pageTitle: 'Dashboard' }
  },
    {
    path: 'dev-diaries',
    loadChildren: () => import('./dev-diaries/dev-diaries.module').then(m => m.DevDiariesModule),
    canActivate: [AuthGuard],
    data: { pageTitle: 'Dev Diaries' }
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
    canActivate: [AuthGuard],
    data: { pageTitle: 'News' }
  },
  {
    path: 'maps',
    loadChildren: () => import('./game-maps/game-maps.module').then(m => m.GameMapsModule),
    canActivate: [AuthGuard],
    data: { pageTitle: 'Game Maps' }
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [AuthGuard],
    data: { pageTitle: 'Heroes' }
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
    canActivate: [AuthGuard],
    data: { pageTitle: 'Leaderboards' }
  },
  {
    path: 'match-history',
    loadChildren: () => import('./match-history/match-history.module').then(m => m.MatchHistoryModule),
    canActivate: [AuthGuard],
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class AppRoutingModule { }