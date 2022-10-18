import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Utils } from 'src/app/logic/utils';
import { ChartService } from 'src/app/services/chart.service';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-column',
  templateUrl: './dashboard-column.component.html',
  styleUrls: ['./dashboard-column.component.scss'],
})
export class DashboardColumnComponent implements OnInit, OnDestroy {
  public chart: any;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chart = this.chartService.createColumnChart('BarChart');
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
