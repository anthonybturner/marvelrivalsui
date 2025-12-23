import { NgClass } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlayerStats } from 'src/app/player-stats/data/player-stats.model';
import { PlayerStatsService } from 'src/app/player-stats/services/player-stats-service';

@Component({
  selector: 'mr-player-profile',
  standalone: true,
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.scss',
  imports: [NgClass],
})
export class PlayerProfile implements OnInit {

  playerStatsService = inject(PlayerStatsService);
  destroyRef = inject(DestroyRef)

  playerStats = signal<PlayerStats | undefined>(undefined);
  
  ngOnInit(): void {

    const subscription =  this.playerStatsService.getPlayerStats("SilentCoder")
     .subscribe(result =>{
        this.playerStats.set(result);
     });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  playerName = computed(()=> this.playerStats()?.player.name)
  playerUID = computed(()=> this.playerStats()?.player.uid)
  playerIcon = computed(()=> `https://marvelrivalsapi.com/rivals${this.playerStats()?.player.icon.player_icon}`)
  playerLevel = computed(()=> this.playerStats()?.player.level)
  playerRank = computed(()=> this.playerStats()?.player.rank.rank)
  playerTeam = computed(()=> this.playerStats()?.player.team)
  playerAchievements = computed(()=> this.playerStats()?.player.info.completed_achievements)
  playerPlatform = computed(()=> this.playerStats()?.player.info.login_os)

  rankedIcon = computed(()=> `https://marvelrivalsapi.com/rivals${this.playerStats()?.player.rank.image}`)
  playerUpdated = computed(()=>  false);
  



}
