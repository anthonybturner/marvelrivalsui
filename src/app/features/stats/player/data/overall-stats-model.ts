import { GameStats } from "./game-stats-model";

export interface OverallStats {
  total_matches: number;
  total_wins: number;
  unranked: GameStats;
  ranked: GameStats;
}