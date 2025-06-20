import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IHero } from 'src/app/heroes/hero/data/models/hero.model';

import { getImageUrl,getRoleImage } from 'src/app/shared/utilities/image-utils';

@Component({
  selector: 'mr-leader-board-details-card',
  standalone: false,
  templateUrl: './leader-board-details-card.component.html',
  styleUrl: './leader-board-details-card.component.scss'
})
export class LeaderBoardDetailsCardComponent implements OnInit, OnDestroy{

  @Input() hero!: IHero;
  getImageUrl = getImageUrl;
  getRoleImage = getRoleImage;

  constructor(){}

  ngOnDestroy(): void {
    
  }

  ngOnInit(){

  }

}
