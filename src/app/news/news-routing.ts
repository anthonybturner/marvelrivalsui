import { Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsResolver } from './services/news-resolver.resolver';

export const routes: Routes = [
  { path: '', component:NewsComponent, resolve:{ resolvedData: NewsResolver}},  // Default route (Home)
];

