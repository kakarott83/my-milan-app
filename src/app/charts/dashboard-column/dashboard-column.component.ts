import * as Highcharts from 'highcharts';
import { Utils } from 'src/app/logic/utils';
import { ChartService } from 'src/app/services/chart.service';

import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-column',
  templateUrl: './dashboard-column.component.html',
  styleUrls: ['./dashboard-column.component.scss'],
})
export class DashboardColumnComponent implements OnInit, AfterViewInit {
  /* ToDo Auslagern in Service */
  xAxisLabel: string[] = [];
  yAxisData = [2, 4, 2, 3, 1, 1, 2, 3, 4, 1, 0, 2];
  Highcharts: typeof Highcharts = Highcharts;
  myDate: number[] = [];

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Reisen in letzten 6 Monate',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Monate',
      },
      dateTimeLabelFormats: {
        // don't display the dummy year
        month: '%b',
        year: '%Y',
      },
      tickPixelInterval: 20,
    },
    yAxis: {
      title: {
        text: 'Anzahl',
      },
    },
    series: [
      {
        type: 'line',
        data: this.myDate,
        name: 'Bezahlt',
      },
      /* {
        type: 'line',
        data: [14, 3, 2, 1, 5],
        name: 'Eingereicht',
      },
      {
        type: 'line',
        data: [14, 3, 2, 1, 5],
        name: 'Gesamt',
      }, */
    ],
  };

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    let today = new Date();
    for (let index = 0; index < 12; index++) {
      this.xAxisLabel.push(Utils.substractMonth(index).toString());
    }

    let myDate = this.xAxisLabel.map((child, index) => {
      const modString = child.replace(/ /, ' 1 ');
      const newDate = new Date(modString);
      const month = newDate.getMonth();
      const year = newDate.getFullYear();
      return [Date.UTC(year, month, 1), this.yAxisData[index]];
    });

    /*     let xAxisLabel = [
      'Jul 16',
      'Oct 16',
      'Jan 17',
      'May 17',
      'Jul 17',
      'Oct 17',
      'Jan 18',
      'Apr 18',
      'Aug 20',
      'Sep 20',
      'Oct 20',
      'Dec 20',
    ]; */

    let yAxisData = [2, 4, 2, 3, 1, 1, 2, 3, 4, 1, 0, 2];

    /* https://www.appsloveworld.com/highchart/100/23/how-to-display-months-in-x-axis-labels-in-highcharts-source-code */
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
}
