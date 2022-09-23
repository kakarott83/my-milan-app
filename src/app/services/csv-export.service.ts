import * as moment from 'moment';
import { ngxCsv } from 'ngx-csv/ngx-csv';

import { DatePipe, formatDate, Location } from '@angular/common';
import { Injectable } from '@angular/core';

import * as Utils from '../logic/utils';
import { Travel } from '../model/travel';

@Injectable({
  providedIn: 'root',
})
export class CsvExportService {
  constructor(private datePipe: DatePipe) {}

  createCsv(input: Travel[]): any {
    let outputArray: any[] = [];

    let headers = [
      'Beginn',
      'Uhrzeit',
      'Ende',
      'Uhrzeit',
      'Kunde',
      'Ort',
      'Zweck',
      'Taxi',
      'Bus/Bahn',
      'Autokosten',
      'Hotel',
      'Sonstiges',
    ];

    input.forEach((element) => {
      let taxi = 0;
      let bus = 0;
      let auto = 0;
      let hotel = 0;
      let sonst = 0;

      element.spends.forEach((s) => {
        switch (s.type) {
          case 'Taxi':
            taxi = taxi + s.value;
            break;
          case 'Bus/Bahn':
            bus = bus + s.value;
            break;
          case 'Auto':
            auto = auto + s.value;
            break;
          case 'Hotel':
            hotel = hotel + s.value;
            break;
          default:
            sonst = sonst + s.value;
        }
      });

      console.log(
        new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(auto)
      );

      outputArray.push({
        start: String(this.datePipe.transform(element.startDate, 'dd.MM.yyyy')),
        startTime: String(this.datePipe.transform(element.startDate, 'hh:mm')),
        end: String(this.datePipe.transform(element.endDate, 'dd.MM.yyyy')),
        endTime: String(this.datePipe.transform(element.endDate, 'hh:mm')),
        customer: element.customer,
        city: element.city,
        reason: element.reason,
        taxi: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(taxi),
        bus: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(bus),
        auto: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(auto),
        hotel: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(hotel),
        sonst: new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(sonst),
      });
    });

    outputArray.sort((a, b) => {
      let splitA = a.start.split('.');
      let splitB = b.start.split('.');
      let aDate = new Date(splitA[2], splitA[1] - 1, splitA[0]);
      let bDate = new Date(splitB[2], splitB[1] - 1, splitB[0]);

      let _a = moment(aDate);
      let _b = moment(bDate);

      if (_a.isBefore(_b)) {
        return -1;
      }

      if (_a.isAfter(_b)) {
        return 1;
      }

      return 0;
    });

    console.log(outputArray[0].start, 'Start');
    let splitMonth = outputArray[0].start.split('.');
    let month = new Date(splitMonth[2], splitMonth[1] - 1, splitMonth[0]);

    console.log(month, 'Monat');

    let options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title:
        'Reisekosten ' +
        month.toLocaleString('de-de', { month: 'long' }) +
        ' ' +
        month.getFullYear(),
      useBom: true,
      noDownload: false,
      headers: headers,
    };

    return new ngxCsv(outputArray, 'Report', options);
  }
}
