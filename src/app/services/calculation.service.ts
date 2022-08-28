import * as moment from 'moment';
import { from } from 'rxjs';
import { filter, find, map, mapTo, startWith } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { Calc } from '../model/calc';
import { Country } from '../model/country';
import { Customer } from '../model/customer';
import { Travel } from '../model/travel';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor(private dataService: DataService) {}

  myCalc: Calc = {
    spends: 0,
    rate: 0,
    sum: 1,
  };

  myCustomer: Customer = {
    id: 0,
    name: '',
    city: '',
    country: '',
  };

  customerList: Customer[] = [];
  countryList: Country[] = [];

  myCountry: Country = {
    id: 0,
    name: '',
    rate: 0,
    halfRate: 0,
  };

  calculation(travel: Travel): Calc {
    let sumSpends = 0;
    let sumRate = 0;
    let breakfastFactor = 1;
    let launchFactor = 1;
    let dinnerFactor = 1;

    if (
      travel &&
      travel.startDate !== undefined &&
      travel.endDate !== undefined &&
      travel.country !== undefined
    ) {
      //
      if (travel.hasBreakfast) {
        breakfastFactor = 0.8;
      } else {
        breakfastFactor = 1;
      }

      if (travel.hasLaunch) {
        launchFactor = 0.8;
      } else {
        launchFactor = 1;
      }

      if (travel.hasDinner) {
        dinnerFactor = 0.8;
      } else {
        dinnerFactor = 1;
      }

      let start = moment(travel.startDate);
      let end = moment(travel.endDate);
      let durationDays = end.diff(start, 'minutes');
      let duationHours = end.diff(start, 'h');
      let numDays = Math.floor(durationDays / 1440);
      let numHours = Math.floor((durationDays % 1440) / 60);

      console.log(numDays, 'Days');
      console.log(numHours, 'Hours');
      console.log(travel.rate);
      console.log(travel.halfRate);

      /*Ausgaben addieren*/
      travel.spends.forEach((element) => {
        sumSpends += element.value;
      });
      switch (numDays) {
        case 0:
          /*Anzahl Tage 0 und 8h*/
          if (numHours > 8) {
            sumRate = travel.halfRate;
          }
          break;
        case 1:
          /*1 Tag Anreise, Abreise abzgl. Frühstück*/
          sumRate = travel.halfRate + travel.halfRate * breakfastFactor;
          break;
        default:
          /*mehr als 1 Tag, Anreise, Abreise Tagespauschale*/
          sumRate = travel.halfRate + travel.halfRate * breakfastFactor;
          sumRate += (numDays - 1) * (travel.rate * breakfastFactor);
          break;
      }
    }
    this.myCalc.rate = sumRate;
    this.myCalc.spends = sumSpends;
    this.myCalc.sum = sumRate + sumSpends;
    return this.myCalc;
  }
}
