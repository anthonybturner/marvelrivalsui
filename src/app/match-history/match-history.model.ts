// match-history.model.ts
export interface IMatchHistory {
  match_map_id: number;
  map_thumbnail: string;
  match_play_duration: number;
  match_player: {
    assists: number;
    kills: number;
    deaths: number;
    is_win: { score: number; is_win: boolean };
    player_hero: {
      hero_id: number;
      hero_name: string;
      hero_thumbnail: string;
      hero_type: string; // Assuming hero_type is part of the player_hero
      kills: number;
      deaths: number;
      assists: number;
      total_hero_damage: number;
      total_hero_heal: number;
    };
    disconnected: boolean;
    hero_type: string; // Assuming hero_type is part of the match player
    total_hero_damage: number;
  };
  match_season: string;
  match_time_stamp: number;
  match_uid: string;
  match_winner_side: number;
  mvp_uid: number;
  game_mode_id: number;
  score_info: { [key: number]: number };
  svp_uid: number;
}

export interface IMatchHistoryResponse {
  matchHistory: any;
  match_history: IMatchHistory[];  // This is the key part, which holds the array of matches
}
