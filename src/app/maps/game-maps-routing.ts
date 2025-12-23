import { Routes } from '@angular/router';
import { GameMapsComponent } from './game-maps.component';
import { GameMapsResolver } from './services/game-maps.resolver';

export const routes: Routes = [
  {
    path: '',
    component: GameMapsComponent,
    data: { pageTitle: 'Game Maps' },
    resolve: { resolvedData: GameMapsResolver } // Assuming you have a resolver for game maps 
  }
];