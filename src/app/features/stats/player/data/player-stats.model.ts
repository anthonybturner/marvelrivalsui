import { HeroMatchup } from "./hero-matchup-model";
import { HeroStats } from "./hero-stats-model";
import { MapStats } from "./map-stats-model";
import { MatchHistory } from "./match-history-model";
import { OverallStats } from "./overall-stats-model";
import { RankGameSeason } from "./rank-game-season.model";
import { RankHistory } from "./rank-history-model";
import { TeamMate } from "./team-mate-model";

export interface PlayerStats {
  uid: number;
  name: string;
  updates: {
    info_update_time: string;
    last_history_update: string;
    last_inserted_match: string;
    last_update_request: string;
  };
  player: {
    uid: number;
    level: string;
    name: string;
    icon: {
      player_icon_id: string;
      player_icon: string;
    };
    rank: {
      rank: string;
      image: string | null; 
      color: string | null;
    };
    team: {
      club_team_id: string;
      club_team_mini_name: string;
      club_team_type: string;
    };
    info: {
      completed_achievements: string;
      login_os: string;
      rank_game_season: {
        [key: string]: RankGameSeason;
      };
    };
  };
  isPrivate: boolean;
  overall_stats: OverallStats;
  match_history: MatchHistory[];
  rank_history: RankHistory[];
  hero_matchups: HeroMatchup[];
  team_mates: TeamMate[];
  heroes_ranked: HeroStats[];
  heroes_unranked: HeroStats[];
  maps: MapStats[];
}