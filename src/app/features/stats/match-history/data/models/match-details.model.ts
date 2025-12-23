export interface IMatchDetailsResponse {
  match_details: IMatchDetails;
}

export interface IMatchDetails {
  match_uid: string;
  game_mode: IGameMode;
  replay_id: string;
  mvp_uid: string;
  mvp_hero_id: number;
  svp_uid: string;
  svp_hero_id: number;
  dynamic_fields: { [key: string]: any };
  match_players: IMatchPlayer[];
}

export interface IGameMode {
  game_mode_id: number;
  game_mode_name: string;
}

export interface IMatchPlayer {
  player_uid: string;
  nick_name: string;
  player_icon: string;
  camp: string;
  cur_hero_id: number;
  cur_hero_icon: string;
  is_win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  total_hero_damage: number;
  total_hero_heal: number;
  total_damage_taken: number;
  player_heroes: IPlayerHero[];
}

export interface IPlayerHero {
  hero_id: number;
  play_time: number;
  kills: number;
  deaths: number;
  assists: number;
  session_hit_rate: number;
  hero_icon: string;
}