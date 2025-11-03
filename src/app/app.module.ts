import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';  // Import routing module
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from "./site-footer/site-footer.component";
import { DevDiariesComponent } from './dev-diaries/dev-diaries.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { OAuthModule } from 'angular-oauth2-oidc';


@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    OAuthModule.forRoot()
],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
