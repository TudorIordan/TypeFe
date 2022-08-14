import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameStats } from 'src/app/core/enums';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private finishGame = new Subject<GameStats>();
  finishGame$ = this.finishGame.asObservable();

  constructor(private statisticsService: StatisticsService) {}

  setfinishGame(gameStats: GameStats) {
    this.statisticsService.setGameStatistics(gameStats).subscribe(() => {
      this.finishGame.next(gameStats);
    });
  }
}
