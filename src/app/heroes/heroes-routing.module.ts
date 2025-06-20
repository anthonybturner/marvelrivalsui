import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroesResolver as HeroesResolver } from './services/heroes-resolver';

const routes: Routes = [
  { path: '', component: HeroesComponent, resolve:{ resolvedData: HeroesResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class HeroRoutingModule { }
