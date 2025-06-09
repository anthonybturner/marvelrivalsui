import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero.component';
import { HeroResolver } from './services/hero-resolver';

const routes: Routes = [
  { path: '', component: HeroComponent, resolve:{ resolvedData: HeroResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class HeroRoutingModule { }
