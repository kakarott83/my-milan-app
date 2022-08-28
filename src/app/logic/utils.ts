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
}
