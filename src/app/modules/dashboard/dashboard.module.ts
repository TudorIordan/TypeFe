import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { TimerComponent } from './components/timer/timer.component';
import { PageComponent } from './page/page.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GameComponent, TimerComponent, PageComponent, ChartComponent],
  imports: [CommonModule, NgChartsModule],
})
export class DashboardModule {}
