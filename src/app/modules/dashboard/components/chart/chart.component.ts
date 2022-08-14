import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  _chartData: any;
  @Input() set chartData(value: any) {
    this._chartData = value;
    this.chart?.update();
  }
  get chartData(): ChartConfiguration<'line'>['data'] {
    return this._chartData;
  }
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartPlugins = [];
  constructor() {}
}
