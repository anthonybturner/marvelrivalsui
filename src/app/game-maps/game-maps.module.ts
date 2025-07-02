import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameMapsRoutingModule } from './game-maps-routing.module';
import { GameMapsComponent } from './game-maps.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [GameMapsComponent],
  imports: [
    SharedModule,  
    CommonModule,
    GameMapsRoutingModule
  ]
})
export class GameMapsModule { }
