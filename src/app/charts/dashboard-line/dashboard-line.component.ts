import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-dashboard-line',
  templateUrl: './dashboard-line.component.html',
  styleUrls: ['./dashboard-line.component.scss'],
})
export class DashboardLineComponent implements OnInit, OnDestroy {
  chart: any;
  //@ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartType: ChartType = 'line';

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chart = this.chartService.createLineChart('lineChart');
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
