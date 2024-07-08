import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AppService } from '../../services/app.service';
import { CurrencyCodes } from '../../enums/currencyCodes.enum';
import { ExchangeInterfaceResponse } from '../../types/exchangeRateResponse.interface';

@Component({
  standalone: true,
  selector: 'app-current-exchange-rates',
  templateUrl: './currentExchangeRates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, KeyValuePipe],
})
export class CurrentExchangeRatesComponent {
  public readonly CurrencyCodes = CurrencyCodes;

  public currentRates$ = combineLatest(
    Object.values(CurrencyCodes).map((code: CurrencyCodes) =>
      this.appService
        .getCurrentExchangeCurrency(code)
        .pipe(
          map((rate: ExchangeInterfaceResponse) => ({ [code]: rate || [] }))
        )
    )
  ).pipe(
    map(
      (
        ratesArray: {
          [x: string]: ExchangeInterfaceResponse;
        }[]
      ) => ratesArray.reduce((acc, curr) => ({ ...acc, ...curr }), {})
    )
  );

  constructor(private readonly appService: AppService) {}
}
