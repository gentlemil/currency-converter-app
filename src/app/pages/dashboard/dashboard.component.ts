import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../../services/app.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExchangeInterfaceResponse } from '../../types/exchangeRateResponse.interface';
import { Observable, combineLatest } from 'rxjs';
import { CurrencyCodes } from '../../enums/currencyCodes.enum';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DashboardComponent {
  title = 'Currency Converter';
  subtitle = 'Check current exchange rates.';

  CurrencyCodes = CurrencyCodes;

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

  constructor(
    private readonly appService: AppService,
    private fb: FormBuilder
  ) {}

  public getExchangeCurrency(
    currency: string,
    date: string
  ): Observable<ExchangeInterfaceResponse> {
    return this.appService.getExchangeCurrency(currency, date);
  }
}
