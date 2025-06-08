import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';  // Import routing module
// Import Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { NewsComponent } from './news/news.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LatestTutorialsComponent } from './latest-tutorials/latest-tutorials.component';
import { provideHttpClient } from '@angular/common/http';
import { SecondsToMinutesPipe } from "../utils/seconds-to-minutes.pipe";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NewsComponent,
    MatchHistoryComponent,
    LatestTutorialsComponent,
    SiteHeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    RouterModule,
    AppRoutingModule,
    SecondsToMinutesPipe
],
  providers: [
    // HttpClient setup with interceptors if needed
    provideHttpClient()  // This is the new way to provide HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
