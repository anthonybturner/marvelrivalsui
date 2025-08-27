import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DevDiariesRoutingModule } from './dev-diaries-routing.module';
import { DevDiariesComponent } from './dev-diaries.component';



@NgModule({
  declarations: [
    DevDiariesComponent
  ],
  imports: [
    SharedModule,  
    CommonModule,
    DevDiariesRoutingModule,
  ]
})
export class DevDiariesModule { }
