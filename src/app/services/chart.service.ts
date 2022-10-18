import { Chart } from 'chart.js';
import { filter, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Utils } from '../logic/utils';
import { Customer } from '../model/customer';
import { MonthsName } from '../model/month';
import { Travel } from '../model/travel';
import { User } from '../model/user';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public chart: any;
  private travels: any[] = [];
  user: any;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.user = authService.getUserId();
  }

  createColumnChart(chartId: string) {
    let month = Utils.monthList();
    let monthCounts: number[] = [];
    this.dataService
      .getTravelsByUserFs()
      .pipe(
        map((travels: any[]) =>
          travels.map((travel) => ({
            ...travel,
            startDate: travel.startDate.toDate(),
            endDate: travel.endDate.toDate(),
          }))
        )
      )
      .pipe(
        map((travels: any[]) =>
          travels.filter((f) => {
            return f.user === this.user.uid;
          })
        )
      )
      .subscribe((data) => {
        this.travels = data;

        /*Reisen aus dem aktuellen Jahr*/
        let yearFiltered = this.travels.filter((x) => {
          return (
            new Date(x.startDate).getFullYear() === new Date().getFullYear()
          );
        });

        /*Anzahl Reisen im aktuellen Monat*/
        for (let index = 0; index < month.length; index++) {
          let item = yearFiltered.filter((travel) => {
            return new Date(travel.startDate).getMonth() === index;
          });
          monthCounts.push(item.length);
        }

        this.chart = new Chart(chartId, {
          type: 'bar',
          data: {
            // values on X-Axis
            labels: month,
            datasets: [
              {
                label: 'Anzahl',
                data: monthCounts,
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
      });
  }

  createLineChart(chartId: string) {
    let month = Utils.monthList();
    let sum: number = 0;
    let monthSum: number[] = [];

    this.dataService
      .getTravelsByUserFs()
      .pipe(
        map((travels: any[]) =>
          travels.map((travel) => ({
            ...travel,
            startDate: travel.startDate.toDate(),
            endDate: travel.endDate.toDate(),
          }))
        )
      )
      .pipe(
        map((travels: any[]) =>
          travels.filter((f) => {
            return f.user === this.user.uid;
          })
        )
      )
      .subscribe((data) => {
        this.travels = data;

        /*Reisen aus dem aktuellen Jahr*/
        let yearFiltered = this.travels.filter((x) => {
          return (
            new Date(x.startDate).getFullYear() === new Date().getFullYear()
          );
        });

        /*Anzahl Reisen im aktuellen Monat*/
        for (let index = 0; index < month.length; index++) {
          sum = 0;
          let item = yearFiltered.filter((travel) => {
            return new Date(travel.startDate).getMonth() === index;
          });

          /*Summe der Zahlungen*/
          item.forEach((element) => {
            sum += parseInt(element.payout, 10);
          });

          monthSum.push(sum);
        }

        this.chart = new Chart(chartId, {
          type: 'line',
          data: {
            // values on X-Axis
            labels: month,
            datasets: [
              {
                label: 'Auszahlung',
                data: monthSum,
                //backgroundColor: 'blue',
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
      });
  }

  createPieChart(chartId: string) {
    let customer: string[] = [];
    let customerCount: number[] = [];
    this.dataService
      .getTravelsByUserFs()
      .pipe(
        tap((data) => {
          console.log(data, 'Tap');
        })
      )
      .pipe(
        map((travels: any[]) =>
          travels.map((travel) => ({
            ...travel,
            startDate: travel.startDate.toDate(),
            endDate: travel.endDate.toDate(),
          }))
        )
      )
      .pipe(
        map((travels: any[]) =>
          travels.filter((f) => {
            console.log(f.user + '/' + this.user.uid, 'User');
            return f.user === this.user.uid;
          })
        )
      )
      .subscribe((data) => {
        this.travels = data;

        /*Reisen aus dem aktuellen Jahr*/
        let yearFiltered = this.travels.filter((x) => {
          return (
            new Date(x.startDate).getFullYear() === new Date().getFullYear()
          );
        });

        /*Kundenliste*/
        yearFiltered.forEach((travel) => {
          let c = travel.customer;

          if (customer.find((x) => x === c) === undefined) {
            customer.push(c);
          }
        });

        /*Anzahl Reisen pro Kunde*/
        for (let index = 0; index < customer.length; index++) {
          let item = yearFiltered.filter((travel) => {
            return travel.customer === customer[index];
          });
          customerCount.push(item.length);
        }

        console.log(customer, 'List');
        console.log(customerCount, 'ListTravel');

        this.chart = new Chart(chartId, {
          type: 'pie',
          data: {
            // values on X-Axis
            labels: customer,
            datasets: [
              {
                label: 'Anzahl',
                data: customerCount,
                //backgroundColor: 'blue',
              },
            ],
          },
          options: {
            //aspectRatio: 2.5,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                display: false,
              },
            },
          },
        });

        //return this.chart;
      });
  }
}
