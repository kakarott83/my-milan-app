import { Spends } from './spends';

export interface Travel {
  id: number;
  startDate: Date;
  endDate: Date;
  customer: string;
  city: string;
  country: string;
  reason: string;
  isPaid: boolean;
  isSubmitted: boolean;
  hasBreakfast: boolean;
  hasLaunch: boolean;
  hasDinner: boolean;
  user: string;
  spends: Spends[];
  rate: number;
  halfRate: number;
}
