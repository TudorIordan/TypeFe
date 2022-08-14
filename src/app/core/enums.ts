export enum TimerEvents {
  Start,
  Pause,
  Stop,
  Restart,
}

export enum UrlConstants {
  authentication = '/google/google-one-tap',
  postGameStatistics = '/statistics',
  getGameStatistics = '/statistics',
}

export interface GameStats {
  accuracy: number;
  wpm: number;
}

export interface GameStatsResponse extends GameStats {
  id: number;
  date: string;
}
