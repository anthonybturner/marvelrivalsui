import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsResolver } from './services/news-resolver.resolver';

const routes: Routes = [
  { path: '', component:NewsComponent, resolve:{ resolvedData: NewsResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class NewsRoutingModule { }
