import { Component, Input } from '@angular/core';
import { HeroStats } from '../../data/hero-stats-model';
import { getPlayerImage } from 'src/app/shared/utilities/image-utils';

@Component({
  selector: 'mr-top-hero-stats',
  standalone: false,
  templateUrl: './top-hero-stats.html',
  styleUrl: './top-hero-stats.scss',
})
export class TopHeroStats {
  @Input() topPlayedHeroes!: HeroStats[];
  getPlayerImage = getPlayerImage;

  getWinRate(hero: HeroStats): string {
    return hero.matches ? ((hero.wins / hero.matches) * 100).toFixed(2) : '0.00';
  }

  getBlockedPerMin(blocked: number, playTime: number): string {
    if (!playTime) return '0';
    return (blocked / (playTime / 60)).toFixed(0);
  }

  getTimePlayed(seconds: number): string {
    if (!seconds) return '0m';
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return hrs ? `${hrs}h ${remMins}m` : `${remMins}m`;
  }

  getKDRatio(kills: number, deaths: number): string {
    if (!deaths) return kills ? kills.toFixed(2) : '0.00';
    return (kills / deaths).toFixed(2);
  }
}