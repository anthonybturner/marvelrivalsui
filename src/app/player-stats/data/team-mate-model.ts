export interface TeamMate {
  player_info: {
    nick_name: string;
    player_icon: string;
    player_uid: number;
  };
  matches: number;
  wins: number;
  win_rate: string;
}