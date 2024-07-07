import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CurrencyCodes } from '../../enums/currencyCodes.enum';
import { combineLatest } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-current-exchange-rates',
  templateUrl: './currentExchangeRates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, KeyValuePipe],
})
export class CurrentExchangeRatesComponent {
  public readonly CurrencyCodes = CurrencyCodes;
  public currenctRates$ = combineLatest({
    [CurrencyCodes.EUR]: this.appService.getCurrentExchangeCurrency(
      CurrencyCodes.EUR
    ),
    [CurrencyCodes.USD]: this.appService.getCurrentExchangeCurrency(
      CurrencyCodes.USD
    ),
    [CurrencyCodes.CHF]: this.appService.getCurrentExchangeCurrency(
      CurrencyCodes.CHF
    ),
    [CurrencyCodes.GBP]: this.appService.getCurrentExchangeCurrency(
      CurrencyCodes.GBP
    ),
    [CurrencyCodes.JPY]: this.appService.getCurrentExchangeCurrency(
      CurrencyCodes.JPY
    ),
  });

  constructor(private readonly appService: AppService) {}
}
