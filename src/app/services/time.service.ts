import * as moment from 'moment';
import { interval, map, timer } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private date = new Date();

  constructor() {}

  getDate() {
    return timer(1000, 1000).pipe(map((_) => this.getDateTime()));
  }

  private getDateTime() {
    this.date.setSeconds(this.date.getSeconds() + 1);
    moment.locale('de');
    return moment(this.date).format('dddd, Do MMMM YYYY, h:mm:ss');
  }
}
