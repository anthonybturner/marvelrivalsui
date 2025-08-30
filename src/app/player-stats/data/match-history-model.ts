import { PlayerPerformance } from "./player-performance-model";

export interface MatchHistory {
  match_uid: string;
  map_id: number;
  map_thumbnail: string;
  duration: number;
  season: number;
  winner_side: number;
  mvp_uid: number;
  svp_uid: number;
  match_time_stamp: number;
  play_mode_id: number;
  game_mode_id: number;
  score_info: { [key: string]: number } | null;
  player_performance: PlayerPerformance;
}