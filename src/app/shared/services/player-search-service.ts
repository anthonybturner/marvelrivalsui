import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerSearchService {

  constructor() { }

  private playerSearchSource = new Subject<string>();
  playerSearch$ = this.playerSearchSource.asObservable();

  getPlayerUID(playerName: string): string {
    // Implement your logic to get the player UID based on the player name
    return 'some-unique-uid';
  }

  searchPlayer(nickName: string) {
    this.playerSearchSource.next(nickName);
  }
}