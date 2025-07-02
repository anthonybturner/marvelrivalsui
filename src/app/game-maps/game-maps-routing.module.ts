import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMapsComponent } from './game-maps.component';
import { GameMapsResolver } from './services/game-maps.resolver';

const routes: Routes = [
  {
    path: '',
    component: GameMapsComponent,
    data: { pageTitle: 'Game Maps' },
    resolve: { resolvedData: GameMapsResolver } // Assuming you have a resolver for game maps 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameMapsRoutingModule { }
