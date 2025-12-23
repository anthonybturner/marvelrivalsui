export interface HeroStats {
  hero_id: number;
  hero_name: string;
  hero_thumbnail: string;
  matches: number;
  wins: number;
  mvp: number;
  svp: number;
  kills: number;
  deaths: number;
  assists: number;
  play_time: number;
  damage: number;
  heal: number;
  damage_taken: number;
  main_attack: {
    total: number;
    hits: number;
  };
}