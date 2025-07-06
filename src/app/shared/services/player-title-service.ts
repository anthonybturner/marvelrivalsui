import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerTitleService {
  playerName$ = new BehaviorSubject<string>('');
  setPlayerName(name: string) {
    this.playerName$.next(name);
  }
}