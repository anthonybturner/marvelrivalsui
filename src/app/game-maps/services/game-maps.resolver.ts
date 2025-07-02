import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IGameMapsResponse } from '../data/game-maps.model';
import { GameMapsService } from './game-maps.service';

@Injectable({
  providedIn: 'root'
})
export class GameMapsResolver implements Resolve<Observable<IGameMapsResponse>> {
  constructor(private gameMapsService: GameMapsService) { }

  resolve(): Observable<IGameMapsResponse> {
    return this.gameMapsService.getMaps();
  }
} 
