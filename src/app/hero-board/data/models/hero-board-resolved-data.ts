
// src/app/heroes/data/models/hero-resolved-data.ts
export interface IHeroBoardResolvedData {
  players?: IHeroBoard[];
}
export interface IHeroBoard {
  id: string;
  name: string;
  real_name: string;
  imageUrl: string;
}

export interface IHeroBoardResponse {
  players: IHeroBoard[];  // This is the key part, which holds the array of matches
}
