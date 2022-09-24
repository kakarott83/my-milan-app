import { Chart } from 'chart.js';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public chart: any;

  constructor() {}

  createChart(chartId: string) {
    this.chart = new Chart(chartId, {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Januar',
          'Februar',
          'März',
          'April',
          'Mai',
          'Juni',
          'Juli',
          'August',
          'September',
          'Oktober',
          'November',
          'Dezember',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['1', '2', '0', '2', '4', '2', '1', '5', '2', '0', '0', '2'],
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        //aspectRatio: 2.5,
        maintainAspectRatio: false,
        scales: {
          x: {},
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
    return this.chart;
  }
}
