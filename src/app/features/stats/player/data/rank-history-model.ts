export interface RankHistory {
  match_time_stamp: number;
  level_progression: {
    from: number;
    to: number;
  };
  score_progression: {
    add_score: number;
    total_score: number;
  };
}
