import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  // Example component
import { NewsComponent } from './news/news.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { MatchHistoryResolver } from './match-history/match-history.resolver';

const routes: Routes = [
  {
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),  // Lazy loading the Dashboard module
    title: "Rivals Watch" 
  },  // Default route (Home)
  { path: 'home', component: DashboardComponent, title: "Home - Rivals Watch" },  // Default route (Home)
  { path: 'news', component: NewsComponent },  // Default route (Home)
  { path: 'heroes',loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule)},
  { path: 'matches', component: MatchHistoryComponent, resolve:{ resolvedData: MatchHistoryResolver}},  // Default route (Home)
  { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  { path: 'heroes', loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule) },  // Default route (Home)
  // You can add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class AppRoutingModule { }
