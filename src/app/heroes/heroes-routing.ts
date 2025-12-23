import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroesResolver as HeroesResolver } from './services/heroes-resolver';

export const routes: Routes = [
  { path: '', component: HeroesComponent, resolve:{ resolvedData: HeroesResolver}},  // Default route (Home)
];