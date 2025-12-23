import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '', component: DashboardComponent, 
    children:[]
  },
  {
    path: ':uid', component: DashboardComponent,
    children:[]
  }
];
