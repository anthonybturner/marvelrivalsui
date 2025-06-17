export interface IHeroInfo{
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
}