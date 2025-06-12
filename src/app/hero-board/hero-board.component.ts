import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHeroBoard } from './data/models/hero-board-resolved-data';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HeroBoardGridlistComponent } from "./hero-board-gridlist/hero-board-gridlist.component";

@Component({
  selector: 'mr-player',
  standalone: false,
  templateUrl: './hero-board.component.html',
  styleUrl: './hero-board.component.scss'
})
export class HeroBoardComponent implements OnInit, OnDestroy {
  players: IHeroBoard[] = []
  ngUnsubscribe = new Subject();
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute){}
  
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void{
    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((results) =>{
      this.players = results["resolvedData"];
    })
  }

}