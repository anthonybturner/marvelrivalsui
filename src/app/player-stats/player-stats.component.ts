import { Component, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerStats } from './data/player-stats.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { PlayerStatsService } from './services/player-stats-service';
import { getPlayerImage } from 'src/app/shared/utilities/image-utils';
import { HeroStats } from './data/hero-stats-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { needsUpdate, parseLastUpdateDate } from 'src/app/shared/utilities/date-utils';
import { RankGameSeason } from './data/rank-game-season.model';
@Component({
  selector: 'mr-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
  standalone: false
})
export class PlayerStatsComponent implements OnInit, OnDestroy {

  // ===== UTILITIES =====
  getPlayerImage = getPlayerImage;
  // ===== SIGNALS =====
  isLoading = signal<boolean>(false);
  playerStats = signal<PlayerStats | null>(null);
  ngUnsubscribe = new Subject();
  searchPlayerName = signal<string>('');
  isPlayerUpdated = signal<boolean | null>(null);
  // ===== COMPUTED SIGNALS =====
  topPlayedHeroes = computed(() => {
    if (!this.playerStats()?.heroes_ranked) return [];
    return [...this.playerStats()?.heroes_ranked!]
      .sort((a, b) => b.play_time - a.play_time)
      .slice(0, 10);
  });

  totalLosses = computed(() => {
    if (!this.playerStats()?.overall_stats) return 0;
    const { total_wins, total_matches } = this.playerStats()?.overall_stats!;
    return total_matches ? total_matches - total_wins : 0;
  });

  winPercentage = computed(() => {
    if (!this.playerStats()?.overall_stats) return '0.00';
    const { total_wins, total_matches } = this.playerStats()?.overall_stats!;
    return total_matches ? ((total_wins / total_matches) * 100).toFixed(2) + "%" : '0.00';
  });

  playerRankGameSeason = computed(() => {
    return this.playerStats()?.player?.info?.rank_game_season;
  });

  rankSeasonKeys = computed(() => {
    const seasonObj = this.playerRankGameSeason();
    return seasonObj ? Object.keys(seasonObj) : [];
  });

  playerName = computed(() => {
    return this.playerStats()?.player?.name || "Unknown Player";
  })

  searchDisabled = computed(() =>
    !this.searchPlayerName().trim() || this.isLoading()
  );

  // ===== CONSTRUCTOR =====
  constructor(private activatedRoute: ActivatedRoute,
    private playerStatsService: PlayerStatsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        const uid = params['uid'] || 'SilentCoder'; // fallback if no uid
        this.searchPlayerName.set(uid);
        this.onSearchPlayer();
      });
  }
  getPlayerRank(rank: string | undefined): string {
    if (!rank) return 'Unknown';
    if (rank === 'Invalid level') return 'N/A';
    return `Rank ${rank}`;
  }

  updateSearchPlayerName(name: string) {
    this.searchPlayerName.set(name);
  }

  getWinRate(hero: HeroStats): string {
    return hero.matches ? ((hero.wins / hero.matches) * 100).toFixed(2) : '0.00';
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
    this.isLoading.set(true);
    this.playerStatsService.getPlayerStats(this.searchPlayerName())
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (playerStats) => {
          const lastUpdateDate = parseLastUpdateDate(playerStats.updates.last_history_update);
          // If last update is before today, update
          const updateNeeded = lastUpdateDate && needsUpdate(lastUpdateDate);
          if (updateNeeded) {
            this.updatePlayer();
          }
          this.isPlayerUpdated.set(lastUpdateDate && !updateNeeded);
          this.playerStats.set(playerStats);
          this.showToast(`Player: ${this.searchPlayerName()} found.`, 4000, 'success-snackbar');
        },
        error: (error) => {
          this.handleError("Searched Player", error);
        }
      })
  }

  updatePlayer() {
    this.showToast(`Updating player check back later: ${this.searchPlayerName()}.`, 4000, 'success-snackbar');
    this.isLoading.set(true);
    this.playerStatsService.updatePlayerStats(this.searchPlayerName())
      .pipe(finalize(() => {
        this.isLoading.set(false);
      }))
      .subscribe({
        next: (response) => {
          response.message = this.searchPlayerName() + " " + response.message
        },
        error: (error) => {
          this.handleError("Update Player", error);
        }
      })
  }

  private handleError(tag: string, error: any) {
    let friendlyMsg = "An error occurred. Please try again.";

    if (error.status === 400) {
      friendlyMsg = "Bad Request, please check your uid or username.";
    }
    if (error.status === 401) {
      friendlyMsg = "Unauthorized, please check your api key.";
    }
    else if (error.status === 404) {
      friendlyMsg = "Player not found. Please check the name and try again.";
    } else if (error.status === 429) {
      friendlyMsg = "Too many requests. Please wait and try again.";
    } else if (error.error?.message) {
      friendlyMsg = error.error.message;
    } else if (error.status === 500) {
      friendlyMsg = "Server Error, error while processing the update request.";
    }
    this.showToast(`${tag}: ${friendlyMsg}`, 4000, 'error-snackbar');
  }

  showToast(msg: string, duration: number, panelClass: string) {
    this.snackBar.open(msg, 'Close', {
      duration: duration,
      panelClass: [panelClass],
      verticalPosition: 'top' // This moves the snackbar to the top
    });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}