import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerStats } from './data/player-stats.model';
import { Subject, takeUntil } from 'rxjs';
import { PlayerStatsService } from './services/player-stats-service';
import { getPlayerImage } from 'src/app/shared/utilities/image-utils';
import { HeroStats } from './data/hero-stats-model';
@Component({
  selector: 'mr-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
  standalone: false
})
export class PlayerStatsComponent implements OnInit, OnDestroy {

  getPlayerImage = getPlayerImage;
  player: PlayerStats | null = null;
  ngUnsubscribe = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private playerStatsService: PlayerStatsService) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        const uid = params['uid'] || 'SilentCoder'; // fallback if no uid
        this.playerStatsService.getPlayerStats(uid).subscribe(playerData => {
          this.player = playerData;
        });
      });
  }

  getWinRate(hero: HeroStats): string {
  return hero.matches ? ((hero.wins / hero.matches) * 100).toFixed(2) : '0.00';
}
getTopPlayedHeroes(): HeroStats[] {
  if (!this.player?.heroes_ranked) return [];
  return [...this.player.heroes_ranked]
    .sort((a, b) => b.play_time - a.play_time)
    .slice(0, 10);
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

getBlockedPerMin(blocked: number, playTime: number): string {
  if (!playTime) return '0';
  return (blocked / (playTime / 60)).toFixed(0);
}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}