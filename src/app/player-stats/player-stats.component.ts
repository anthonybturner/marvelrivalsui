import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerStats } from './data/player-stats.model';
import { Subject, takeUntil } from 'rxjs';
import { PlayerStatsService } from './services/player-stats-service';
import { getPlayerImage } from 'src/app/shared/utilities/image-utils';
import { HeroStats } from './data/hero-stats-model';
import { PlayerDataResponse } from './data/player-data-response.model';
@Component({
  selector: 'mr-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
  standalone: false
})
export class PlayerStatsComponent implements OnInit, OnDestroy {

  getPlayerImage = getPlayerImage;
  playerStats: PlayerStats | null = null;
  ngUnsubscribe = new Subject();
  searchPlayerName: string = '';
  updatePlayerName: string = '';
  playerUpdateMessage: PlayerDataResponse | null = null;
  PlayerName: string = '';

  constructor(private activatedRoute: ActivatedRoute, private playerStatsService: PlayerStatsService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        const uid = params['uid'] || 'SilentCoder'; // fallback if no uid
        this.playerStatsService.getPlayerStats(uid).subscribe(playerData => {
          this.playerStats = playerData;
        });
      });
  }
  getPlayerRank(rank: string | undefined): string {
    if (!rank) return 'Unknown';
    if (rank === 'Invalid level') return 'N/A';
    return `Rank ${rank}`;
  }
  calculateTotalLosses() {
    if (!this.playerStats?.overall_stats) return 0;
    const { total_wins, total_matches } = this.playerStats.overall_stats;
    return total_matches ? total_matches - total_wins : 0;
  }

  calculateWinPercentage() {
    if (!this.playerStats?.overall_stats) return '0.00';
    const { total_wins, total_matches } = this.playerStats.overall_stats;
    return total_matches ? ((total_wins / total_matches) * 100).toFixed(2) + "%" : '0.00';
  }

  getRankSeasonKeys(seasonObj: any): string[] {
    return seasonObj ? Object.keys(seasonObj) : [];
  }

  getWinRate(hero: HeroStats): string {
    return hero.matches ? ((hero.wins / hero.matches) * 100).toFixed(2) : '0.00';
  }

  getTopPlayedHeroes(): HeroStats[] {
    if (!this.playerStats?.heroes_ranked) return [];
    return [...this.playerStats.heroes_ranked]
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
  onSearchPlayer() {
    this.playerStatsService.getPlayerStats(this.searchPlayerName)
      .subscribe({
        next: (playerStats) => {
          this.playerStats = playerStats
          this.PlayerName = this.searchPlayerName;
          this.playerUpdateMessage = null;
        },
        error: (error) => {
          let friendlyMsg = "An error occurred. Please try again.";
          if (error.status === 404) {
            friendlyMsg = "Player not found. Please check the name and try again.";
          } 
          else if (error.status === 429) {
            friendlyMsg = "Too many requests. Please wait and try again.";
          } 
          else if (error.error?.message) {
            friendlyMsg = error.error.message;
          }
          this.playerUpdateMessage = { message: friendlyMsg } as PlayerDataResponse;
        }
      })
  }
  onUpdatePlayer() {
    this.playerStatsService.updatePlayerStats(this.updatePlayerName)
      .subscribe({
        next: (response) => {
          response.message = this.updatePlayerName + " " + response.message
          this.playerUpdateMessage = response;
        },
        error: (error) => {
          let friendlyMsg = "An error occurred. Please try again.";
          if (error.status === 400) {
            friendlyMsg = "Bad Request, please check your uid or username.";
          }
          else if (error.status === 401) {
            friendlyMsg = "Unauthorized, please check your api key.";
          }
          else if (error.status === 404) {
            friendlyMsg = "Player not found. Please check the name and try again.";
          } 
          else if (error.status === 500) {
            friendlyMsg = "Server Error, error while processing the update request.";
          } 
          else if (error.error?.message) {
            friendlyMsg = error.error.message;
          }
          this.playerUpdateMessage = { message: friendlyMsg } as PlayerDataResponse;
        }
      })
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}