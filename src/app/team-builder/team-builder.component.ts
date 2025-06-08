import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mr-team-builder',
  imports: [],
  templateUrl: './team-builder.component.html',
  styleUrl: './team-builder.component.scss'
})
export class TeamBuilderComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();  // Subject to manage unsubscription
  
  constructor(private activatedRoute: ActivatedRoute){}

   ngOnInit(): void {

    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe( (results) =>{

    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
