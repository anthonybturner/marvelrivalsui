import { Component, Input, signal } from '@angular/core';
import {PlayerInfoStatsType} from "../../../shared/types/types";

@Component({
  selector: 'mr-player-info-stats',
  standalone: false,
  templateUrl: './player-info-stats.html',
  styleUrl: './player-info-stats.scss',
})
export class PlayerInfoStats {

   @Input() playerInfo!:PlayerInfoStatsType;

  isPlayerUpdated = signal<boolean>(false);//NG 17+ way
}
