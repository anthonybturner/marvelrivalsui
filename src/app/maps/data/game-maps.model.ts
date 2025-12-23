export interface IGameMapsResponse {
  total_maps: number;
  maps: IGameMap[];
}

export interface IGameMap {
  id: number;
  name: string;
  full_name: string;
  location: string;
  description: string;
  game_mode: string;
  is_competitve: boolean;
  sub_map: {
    id: string
    name: string,
    thumbnail: string
  };
  video: string;
  images: string[];
}
