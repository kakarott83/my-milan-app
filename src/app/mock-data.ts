import { Travel } from './model/travel';

export const travels: Travel[] = [
    {
        id: 1,
        startDate: new Date(2022-09-1),
        endDate: new Date(2022-09-3),
        customer: 'BANK-now',
        city: 'Horgen',
        isPaid: true,
        isSubmitted: true,
        user: 'XXX1234'
    },
    {
        id: 2,
        startDate: new Date(2022-10-11),
        endDate: new Date(2022-10-13),
        customer: 'BANK-now',
        city: 'Horgen',
        isPaid: true,
        isSubmitted: true,
        user: 'XXX1234'
    },
    {
        id: 3,
        startDate: new Date(2022-08-1),
        endDate: new Date(2022-08-3),
        customer: 'Oberbank',
        city: 'Linz',
        isPaid: false,
        isSubmitted: false,
        user: 'XXX1234'
    },
    {
        id: 4,
        startDate: new Date(2022-11-15),
        endDate: new Date(2022-11-15),
        customer: 'BANK-now',
        city: 'Horgen',
        isPaid: false,
        isSubmitted: true,
        user: 'XXX7894'
    },
    {
        id: 5,
        startDate: new Date(2022-09-1),
        endDate: new Date(2022-09-3),
        customer: 'Toyota',
        city: 'Wien',
        isPaid: true,
        isSubmitted: true,
        user: 'XXX1234'
    },
];