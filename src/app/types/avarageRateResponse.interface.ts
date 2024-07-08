import { AverageRate } from './averageRate.interface';
import { Table } from './table.type';
import { CurrencyCodes } from '../enums/currencyCodes.enum';

export interface AverageRateResponse {
  table: Table;
  currency: string;
  code: CurrencyCodes;
  rates: AverageRate[];
}
