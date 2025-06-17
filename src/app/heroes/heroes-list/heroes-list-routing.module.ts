import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosListComponent } from './heroes-list.component';
import { HeroesListResolver as HeroesListResolver } from './services/heroes-list-resolver';

const routes: Routes = [
  { path: '', component: HerosListComponent, resolve:{ resolvedData: HeroesListResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class HeroRoutingModule { }
