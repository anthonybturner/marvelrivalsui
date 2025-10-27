import { Component, Input } from '@angular/core';
import { OverallInfoStatsType } from 'src/app/shared/types/types';

@Component({
  selector: 'mr-overall-info-stats',
  standalone: false,
  templateUrl: './overall-info-stats.html',
  styleUrl: './overall-info-stats.scss',
})
export class OverallInfoStats {

  @Input() overallInfo!: OverallInfoStatsType;
}
