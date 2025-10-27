export type PlayerInfoStatsType = {
  name: string;
  image: string;
  level: string;
  rank: string;
  rankImage: string;
  completedAchievements: string;
  loginOs: string;
}

export type OverallInfoStatsType = {
  
  totalMatches: number;
  totalWins: number;
  totalLosses: number;
  winPercentage: string;
  unrankedTotalKills: number;
  rankedTotalKills: number;

}