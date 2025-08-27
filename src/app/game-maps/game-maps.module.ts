import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameMapsRoutingModule } from './game-maps-routing.module';
import { GameMapsComponent } from './game-maps.component';
import { SharedModule } from '../shared/shared.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [GameMapsComponent, SafeUrlPipe],
  imports: [
    SharedModule,  
    CommonModule,
    GameMapsRoutingModule
  ]
})
export class GameMapsModule { }
