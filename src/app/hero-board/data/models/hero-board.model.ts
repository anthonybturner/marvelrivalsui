export interface IHeroBoard {
  id: string;
  name: string;
  real_name: string;
}

export interface IHeroBoardResponse {
  players: IHeroBoard[];  // This is the key part, which holds the array of matches
}
