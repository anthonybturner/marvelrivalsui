import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBoardComponent } from './hero-board.component';
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridModule } from 'ag-grid-angular';
import { HeroBoardGridlistComponent } from './hero-board-gridlist/hero-board-gridlist.component';
import { PlayerRoutingModule } from './hero-board-resolver';

@NgModule({
  declarations: [HeroBoardComponent, HeroBoardGridlistComponent],
  imports: [CommonModule, PlayerRoutingModule, AgGridModule]
})

export class HeroBoardModule { 
  constructor(){
    ModuleRegistry.registerModules(
      [ClientSideRowModelModule,]
    )
  }
}
