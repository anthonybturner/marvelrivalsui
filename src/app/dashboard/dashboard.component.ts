import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerProfile } from './player-profile/player-profile';

@Component({
  selector: 'mr-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [PlayerProfile]
})
export class DashboardComponent implements OnInit, OnDestroy{

  constructor() {}
  ngOnInit() {
  }

  ngOnDestroy() {
    // Cleanup logic here
  }

}
