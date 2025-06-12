import { Injectable, Inject } from '@angular/core';
import { IHeroBoardResponse } from  '../data/models/hero-board.model';
import { Resolve } from '@angular/router';
import { HeroBoardService } from './hero-board.service';
import { Observable } from 'rxjs';
import { IHeroBoardResolvedData } from '../data/models/hero-board-resolved-data';

@Injectable({
  providedIn: 'root'
})
export class HeroBoardResolver implements Resolve<IHeroBoardResponse> {

  constructor(@Inject(HeroBoardService) private playerService: HeroBoardService) { }

  resolve(): Observable<IHeroBoardResponse> {
    return this.playerService.getPlayers()
  }
}

export { IHeroBoardResolvedData as IPlayerResolvedData };