import { ngxCsv } from 'ngx-csv/ngx-csv';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvExportService {
  constructor() {}

  createCsv(input: any) {
    let headers = [
      'Beginn',
      'Ende',
      'Kunde',
      'Ort',
      'Zweck',
      'Taxi',
      'Bus/Bahn',
      'Autokosten',
      'Hotel',
      'Sonstiges',
    ];

    let data = [
      {
        name: 'Test 1',
        age: 13,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' ",
      },
      {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' ",
      },
      {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: "using 'Content here, content here' ",
      },
    ];

    let options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Reisekosten',
      useBom: true,
      noDownload: false,
      headers: headers,
    };

    new ngxCsv(data, 'Report', options);
  }
}
