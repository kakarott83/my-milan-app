import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {
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
  };

  constructor() {}

  ngOnInit(): void {}
}
