import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerSearchService {
  private playerSearchSource = new Subject<string>();
  playerSearch$ = this.playerSearchSource.asObservable();

  searchPlayer(nickName: string) {
    this.playerSearchSource.next(nickName);
  }
}