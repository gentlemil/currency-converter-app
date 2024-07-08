import { CurrencyCodes } from '../enums/currencyCodes.enum';
import { Rate } from './rate.interface';

export interface ExchangeInterfaceResponse {
  table: string;
  currency: string;
  code: CurrencyCodes;
  rates: Rate[];
}
