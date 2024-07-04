import { Rate } from './rate.interface';

export interface ExchangeInterfaceResponse {
  table: string;
  currency: string;
  code: string;
  rates: Rate[];
}
