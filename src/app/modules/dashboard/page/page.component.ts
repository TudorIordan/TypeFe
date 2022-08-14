import {
  startWith,
  mergeMap,
  combineLatest,
  filter,
} from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { GameService } from '../services/game.service';
import { GameStatsResponse } from 'src/app/core/enums';
import { ChartData } from 'chart.js';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private statisticsService: StatisticsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  wpmChart: ChartData = {
    datasets: [
      {
        data: [5],
        label: 'WPM',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgb(96 165 250)',
      },
    ],
    labels: [5],
  };
  accuracyChart: ChartData = {
    datasets: [
      {
        data: [5],
        label: 'Accuracy',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgb(252 165 165)',
      },
    ],
    labels: [5],
  };
  displayCharts = false;
  ngOnInit(): void {
    combineLatest([
      this.authService.isLoggedIn$,
      this.gameService.finishGame$.pipe(startWith(0)),
    ])
      .pipe(
        filter(([isLoggedIn, _]) => isLoggedIn),
        mergeMap(() => this.statisticsService.getGameStatistics())
      )
      .subscribe((response: any) => {
        const stats = response.reverse();
        this.wpmChart.datasets[0].data = stats.map(
          (data: GameStatsResponse) => data.wpm
        );
        this.wpmChart.datasets[0].data;
        this.accuracyChart.datasets[0].data = stats.map(
          (data: GameStatsResponse) => data.accuracy
        );

        this.wpmChart.labels = this.getNumbersArray(
          this.wpmChart.datasets[0].data
        );
        this.accuracyChart.labels = this.getNumbersArray(
          this.accuracyChart.datasets[0].data
        );
        this.wpmChart = { ...this.wpmChart };
        this.accuracyChart = { ...this.accuracyChart };
        this.displayCharts = true;
        this.cdr.detectChanges();
      });
  }
  getNumbersArray(wpmData: any[]): number[] {
    return [...Array(wpmData.length).keys()].map((v) => v + 1);
  }
}
