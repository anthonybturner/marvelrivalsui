import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    title: 'Dashboards'
 },
 {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m=> m.HeroesModule),
    title: 'Heroes'
 },
 {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboards',
    title: 'Redirect to Dashboards'
  },
  {
    path: '**',
    redirectTo: 'dashboards',
    title: 'Invalid Route Redirect'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class AppRoutingModule { }
