import {
	ChartConfiguration,
	ChartData,
	ChartEvent,
	ChartOptions,
	ChartType,
} from 'chart.js';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-pie',
  templateUrl: './dashboard-pie.component.html',
  styleUrls: ['./dashboard-pie.component.scss'],
})
export class DashboardPieComponent implements OnInit {
  //@ViewChild(BaseChartDirective) chartPie?: BaseChartDirective | undefined;

  chartType: ChartType = 'pie';

  data: ChartData<'pie'> = {
    labels: ['AIL', 'BANK-now', 'Oberbank', 'Toyota'],
    datasets: [
      {
        label: 'something',
        data: [4, 3, 1, 3],
      },
    ],
  };

  options: ChartOptions<'pie'> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
