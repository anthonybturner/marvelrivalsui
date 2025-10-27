import { Component, Input, Signal } from '@angular/core';
import { RankGameSeason } from '../../data/rank-game-season.model';

@Component({
  selector: 'mr-rank-season-stats',
  standalone: false,
  templateUrl: './rank-season-stats.html',
  styleUrl: './rank-season-stats.scss',
})
export class RankSeasonStats {

  @Input() seasonKey!: () => string[];
  @Input() season!: Signal<{ [key: string]: RankGameSeason } | undefined>;
}
