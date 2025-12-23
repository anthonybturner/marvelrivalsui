import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevDiariesComponent } from './dev-diaries.component';
import { DevDiariesResolver } from './services/dev-diaries.resolver';

const routes: Routes = [
  { path: '', component: DevDiariesComponent, resolve:{ resolvedData: DevDiariesResolver}},  // Default route (Home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuring routing
  exports: [RouterModule]  // Make routing available throughout the app
})
export class DevDiariesRoutingModule { }
