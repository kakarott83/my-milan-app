import * as moment from 'moment';

export class Utils {
  public static firstOfLastWeekFromNow() {
    let date = new Date();
    date.setDate(moment().add(-1, 'week').startOf('isoWeek').date());
    date.setHours(14);
    date.setMinutes(0);
    return date;
  }

  public static middleOfLastWeekFromNow() {
    let date = new Date();
    let m = moment().add(-1, 'week').startOf('isoWeek');
    date.setDate(m.add(3, 'days').date());
    date.setHours(18);
    date.setMinutes(0);
    return date;
  }

  public static dateCompare(a: Date, b: Date): number {
    let _a = moment(a);
    let _b = moment(b);

    if (_a.isBefore(_b)) {
      return 1;
    }

    if (_a.isAfter(_b)) {
      return -1;
    }

    return 0;
  }
}
