import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroResolver } from './services/hero-resolver';

const routes: Routes = [{ path: '', component: HeroesComponent, resolve: {resolvedData: HeroResolver} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
