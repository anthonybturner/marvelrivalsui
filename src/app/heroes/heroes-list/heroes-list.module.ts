import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HeroRoutingModule } from './heroes-list-routing.module';
import { HerosListComponent } from './heroes-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { HeroDetailsCardComponent } from './hero-details-card/hero-details-card.component';
import { HeroAbilitiesCardComponent } from './hero-abilities-card/hero-abilities-card.component';

@NgModule({
  declarations: [
    HerosListComponent, HeroDetailsCardComponent, HeroAbilitiesCardComponent
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    SharedModule,
    ScrollingModule,
    MatFormField,
    MatLabel,
]
})
export class HeroesModule { }