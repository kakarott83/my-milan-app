import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-line',
  templateUrl: './dashboard-line.component.html',
  styleUrls: ['./dashboard-line.component.scss'],
})
export class DashboardLineComponent implements OnInit {
  //@ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartType: ChartType = 'line';

  data: ChartData<'line'> = {
    labels: ['one', 'two', 'three'],
    datasets: [
      {
        label: 'data 1',
        data: [1, 2, 2],
      },
    ],
  };

  options: ChartOptions<'line'> = {
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
