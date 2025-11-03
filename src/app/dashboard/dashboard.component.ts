import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'mr-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy{

  constructor() {}
  ngOnInit() {
  }

  ngOnDestroy() {
    // Cleanup logic here
  }

}
