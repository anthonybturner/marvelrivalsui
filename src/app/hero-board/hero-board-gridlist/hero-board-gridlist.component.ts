import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mr-player-gridlist',
  standalone: false,
  templateUrl: './hero-board-gridlist.component.html',
  styleUrl: './hero-board-gridlist.component.scss'
})
export class HeroBoardGridlistComponent implements OnInit, OnDestroy {
  
  columnDefs: ColDef[] = [];
  rowData: { make: string; model: string; price: number; electric: boolean }[] = [];
  ngUnsubscribe = new Subject();
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    // Row Data: The data to be displayed.
    this.rowData = [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ];

    // Column Definitions: Defines the columns to be displayed.
    this.columnDefs= [  
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ];
    this.activatedRoute.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe((results) =>{
    })
  }
    
  ngOnDestroy(): void {
    
  }

}