import { Injectable } from '@angular/core';

import { Country } from '../model/country';
import { Customer } from '../model/customer';
import { Travel } from '../model/travel';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDataService {
  constructor() {}

  createDb() {
    const travels: Travel[] = [
      {
        id: 1,
        startDate: new Date('2022-09-1'),
        endDate: new Date('2022-09-3'),
        customer: 'BANK-now',
        city: 'Horgen',
        country: 'Schweiz',
        reason: 'Vor Betreuung',
        isPaid: true,
        payout: 45,
        isSubmitted: true,
        hasBreakfast: true,
        hasLaunch: false,
        hasDinner: false,
        user: 'XXX1234',
        rate: 62,
        halfRate: 24,
        spends: [
          { type: 'Auto', value: 9.5, spendDate: new Date('2022-09-02') },
          { type: 'Hotel', value: 109.5, spendDate: new Date('2022-09-02') },
        ],
        iCustomer: {
          id: 1,
          name: 'BANK-now',
          city: 'Horgen',
          country: 'Schweiz',
          logo: 'bnow.png',
        },
      },
      {
        id: 2,
        startDate: new Date('2022-10-11'),
        endDate: new Date('2022-10-13'),
        customer: 'BANK-now',
        city: 'Horgen',
        country: 'Schweiz',
        reason: 'Vor Betreuung',
        isPaid: true,
        payout: 144,
        isSubmitted: true,
        hasBreakfast: true,
        hasLaunch: false,
        hasDinner: false,
        user: 'XXX1234',
        rate: 62,
        halfRate: 24,
        spends: [
          { type: 'Auto', value: 9.5, spendDate: new Date('2022-09-02') },
          { type: 'Hotel', value: 109.5, spendDate: new Date('2022-09-02') },
        ],
        iCustomer: {
          id: 1,
          name: 'BANK-now',
          city: 'Horgen',
          country: 'Schweiz',
          logo: 'bnow.png',
        },
      },
      {
        id: 3,
        startDate: new Date('2022-08-1'),
        endDate: new Date('2022-08-3'),
        customer: 'Oberbank',
        city: 'Linz',
        country: 'Österreich',
        reason: 'Vor Betreuung',
        isPaid: false,
        payout: 65,
        isSubmitted: false,
        hasBreakfast: true,
        hasLaunch: false,
        hasDinner: false,
        user: 'XXX1234',
        rate: 24,
        halfRate: 12,
        spends: [
          { type: 'Auto', value: 9.5, spendDate: new Date('2022-09-02') },
          { type: 'Hotel', value: 109.5, spendDate: new Date('2022-09-02') },
        ],
        iCustomer: {
          id: 4,
          name: 'Oberbank',
          city: 'Linz',
          country: 'Österreich',
          logo: 'ail.png',
        },
      },
      {
        id: 4,
        startDate: new Date('2022-11-15'),
        endDate: new Date('2022-11-15'),
        customer: 'BANK-now',
        city: 'Horgen',
        country: 'Schweiz',
        reason: 'Vor Betreuung',
        isPaid: false,
        payout: 45.85,
        isSubmitted: true,
        hasBreakfast: true,
        hasLaunch: false,
        hasDinner: false,
        user: 'XXX7894',
        rate: 64,
        halfRate: 32,
        spends: [
          { type: 'Auto', value: 9.5, spendDate: new Date('2022-09-02') },
          { type: 'Hotel', value: 109.5, spendDate: new Date('2022-09-02') },
        ],
        iCustomer: {
          id: 1,
          name: 'BANK-now',
          city: 'Horgen',
          country: 'Schweiz',
          logo: 'bnow.png',
        },
      },
      {
        id: 5,
        startDate: new Date('2022-09-1'),
        endDate: new Date('2022-09-3'),
        customer: 'Toyota',
        city: 'Wien',
        country: 'Österreich',
        reason: 'Livegang',
        isPaid: true,
        payout: 145.65,
        isSubmitted: true,
        hasBreakfast: true,
        hasLaunch: false,
        hasDinner: false,
        user: 'XXX1234',
        rate: 24,
        halfRate: 12,
        spends: [
          { type: 'Auto', value: 9.5, spendDate: new Date('2022-09-02') },
          { type: 'Hotel', value: 109.5, spendDate: new Date('2022-09-02') },
        ],
        iCustomer: {
          id: 2,
          name: 'Toyota',
          city: 'Wien',
          country: 'Österreich',
        },
      },
    ];

    const countries: Country[] = [
      {
        id: 1,
        name: 'Schweiz',
        rate: 62,
        halfRate: 34,
      },
      {
        id: 2,
        name: 'Deutschland',
        rate: 24,
        halfRate: 12,
      },
      {
        id: 3,
        name: 'Österreich',
        rate: 24,
        halfRate: 12,
      },
    ];

    const customers: Customer[] = [
      {
        id: 1,
        name: 'BANK-now',
        city: 'Horgen',
        country: 'Schweiz',
        logo: 'bnow.png',
      },
      {
        id: 2,
        name: 'Toyota',
        city: 'Wien',
        country: 'Österreich',
      },
      {
        id: 3,
        name: 'AIL',
        city: 'Gründwald',
        country: 'Deutschland',
        logo: 'ail.png',
      },
      {
        id: 4,
        name: 'Oberbank',
        city: 'Linz',
        country: 'Österreich',
        logo: 'ail.png',
      },
    ];

    return { travels, countries, customers };
  }
}
