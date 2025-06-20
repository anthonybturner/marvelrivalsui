import { NgModule } from '@angular/core';
import { NewsComponent } from './news.component';
import { SharedModule } from '../shared/shared.module';
import { NewsRoutingModule } from './news-routing.module';



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }