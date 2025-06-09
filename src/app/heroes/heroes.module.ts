import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HeroRoutingModule } from './hereo-routing.module';
import { HeroComponent } from './hero.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeroComponent
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    SharedModule,
    ScrollingModule
]
})
export class HeroesModule { }