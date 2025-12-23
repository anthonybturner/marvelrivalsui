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
    path: 'news',
    loadComponent: () => import('./news/news.component').then(m => m.NewsComponent),
    data: { pageTitle: 'News' }
  },
  {
    path: 'maps',
    loadComponent: () => import('./maps/game-maps.component').then(m=>m.GameMapsComponent),
    title: 'Rivals Maps'
  },
  {
    path: 'heroes',
    loadComponent: () => import('./heroes/heroes.component').then(m=>m.HeroesComponent),
    title: 'Heroes'
  },
  {
    path: 'stats',
    loadComponent: () => import('./features/stats/stats-overview').then(m=>m.StatsOverviewComponent) ,
    title: "Stats Overview"
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