export interface PlayerPerformance {
  player_uid: number;
  hero_id: number;
  hero_name: string;
  hero_type: string;
  kills: number;
  deaths: number;
  assists: number;
  is_win: {
    score: number;
    is_win: boolean;
  };
  disconnected: boolean;
  camp: number;
  score_change: number | null;
  level: number | null;
  new_level: number | null;
  new_score: number | null;
}
