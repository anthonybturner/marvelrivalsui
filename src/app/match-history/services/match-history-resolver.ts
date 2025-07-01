import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchHistoryService } from './match-history.service';
// Update the import path if the model is located elsewhere, for example:
import { IMatchHistoryItem, IMatchHistoryResponse } from '../data/models/match-history.model';
// Or, if the file does not exist, create it at the correct location with the following content:
// export interface IMatchHistoryResponse { /* define properties here */ }
// ...existing code...
@Injectable({
  providedIn: 'root'
})
export class MatchHistoryResolver implements Resolve<Observable<IMatchHistoryResponse>> {
  constructor(private matchHistoryService: MatchHistoryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMatchHistoryResponse> {
    return this.matchHistoryService.getPlayerHistory("SilentCoder").pipe(
      map((response: IMatchHistoryResponse) => ({
        playerName: response.playerName,
        match_history: response.match_history
      }))
    );
  }
} 
