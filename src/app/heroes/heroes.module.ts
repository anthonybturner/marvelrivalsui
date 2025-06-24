import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FormsModule } from '@angular/forms';

import { HeroRoutingModule } from './heroes-routing.module';
import { HeroesComponent as HeroesComponent } from './heroes.component';
import { SharedModule } from '../shared/shared.module';
import { HeroDetailsCardComponent } from './hero/hero-details-card/hero-details-card.component';
import { HeroAbilitiesCardComponent } from './hero/hero-details-card/hero-abilities-card/hero-abilities-card.component';

@NgModule({
  declarations: [
    HeroesComponent, HeroDetailsCardComponent, HeroAbilitiesCardComponent
  ],
  imports: [
    HeroRoutingModule,
    SharedModule,
    FormsModule,
    ScrollingModule
],
exports:[
  HeroDetailsCardComponent
]
})
export class HeroesModule { }