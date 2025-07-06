export interface IMatchHistoryResponse {
  playerName: string;
  match_history: IMatchHistoryItem[];
}

export interface IMatchHistoryItem {
  match_map_id: number;
  match_map_name: string;
  map_thumbnail: string;
  match_play_duration: string;
  match_season: string;
  match_uid: string;
  match_winner_side: number;
  mvp_uid: number;
  svp_uid: number;
  score_info: { [side: string]: number };
  match_time_stamp: number;
  play_mode_id: number;
  game_mode_id: number;
  match_player: IMatchPlayer;
}

export interface IMatchPlayer {
  assists: number;
  kills: number;
  deaths: number;
  is_win: {
    score: number;
    is_win: boolean;
  };
  disconnected: boolean;
  player_uid: number;
  camp: number | null;
  score_info: IPlayerScoreInfo;
  player_hero: IPlayerHero;
}

export interface IPlayerScoreInfo {
  add_score: number;
  level: number;
  new_level: number;
  new_score: number;
}

export interface IPlayerHero {
  hero_id: number;
  hero_name: string;
  hero_type: string;
  kills: number;
  deaths: number;
  assists: number;
  play_time: {
    raw: number;
    formatted: string;
  };
  total_hero_damage: number;
  total_damage_taken: number;
  total_hero_heal: number;
}