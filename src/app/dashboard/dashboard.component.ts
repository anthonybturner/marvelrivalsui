import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'mr-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: []
})
export class DashboardComponent implements OnInit, OnDestroy{

  constructor() {}
  ngOnInit() {
  }

  ngOnDestroy() {
    // Cleanup logic here
  }

}
