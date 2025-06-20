// src/app/heroes/data/models/hero-resolved-data.ts
export interface IHeroBoardResponse {
  players: IHeroBoardPlayer[]
}

export interface IHeroBoardPlayer {

    info: {
      name: string, 
      cur_head_icon_id: string,
      rank_season: {
        rank_game_id: number, 
        level: number,
        rank_score: string,
        max_level: number,
        max_rank_score: string,
        update_time: number,
        win_count: number,
        protect_score: number,
        diff_score: number
        },
      login_os: number
    };
    player_uid: number,
    matches: number,
    wins: number,
    kills: number,
    deaths: number,
    assists: number,
    play_time: number,
    total_hero_damage: number,
    total_damage_taken: number,
    total_hero_heal: number,
    mvps: number,
    svps: number;
}
