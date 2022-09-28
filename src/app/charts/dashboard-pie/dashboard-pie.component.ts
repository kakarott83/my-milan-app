import {
	ChartConfiguration,
	ChartData,
	ChartEvent,
	ChartOptions,
	ChartType,
} from 'chart.js';
import { ChartService } from 'src/app/services/chart.service';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-pie',
  templateUrl: './dashboard-pie.component.html',
  styleUrls: ['./dashboard-pie.component.scss'],
})
export class DashboardPieComponent implements OnInit {
  public chart: any;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chart = this.chartService.createPieChart('pieChart');
  }
}
