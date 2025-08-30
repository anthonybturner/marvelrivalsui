import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mr-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy{

  constructor(private activatedRoute: ActivatedRoute) {}
  userId: string | undefined;
  ngOnInit() {
    // Initialization logic here
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
    });
  }

  ngOnDestroy() {
    // Cleanup logic here
  }

}
