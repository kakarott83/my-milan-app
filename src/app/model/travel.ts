import { Spends } from "./spends";

export interface Travel {
    id: number,
    startDate: Date,
    endDate: Date,
    customer: string,
    city: string,
    country: string,
    reason: string,
    isPaid: boolean,
    isSubmitted: boolean,
    user: string,
    spends: Spends[]
}
