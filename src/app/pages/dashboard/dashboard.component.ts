import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExchangeInterfaceResponse } from '../../types/exchangeRateResponse.interface';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { CurrencyCodes } from '../../enums/currencyCodes.enum';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  isLoading$ = this.appService.isLoading$;
  title = 'Currency Converter';
  subtitle = 'Check current exchange rates.';
  availableCurrencies = [];

  CurrencyCodes = CurrencyCodes;

  Object = Object;

  currencyExchangeHistory$ =
    new BehaviorSubject<ExchangeInterfaceResponse | null>(null);

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

  public dateField = new FormControl();

  public form = this.fb.group({
    currency: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    private readonly appService: AppService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dateField.setValue(new Date());
    this.dateField.valueChanges.subscribe((x) => console.log(x));
  }

  public getExchangeCurrency(
    currency: string,
    date: string
  ): Observable<ExchangeInterfaceResponse> {
    return this.appService.getExchangeCurrency(currency, date);
  }

  getHistoricalRates() {
    if (this.form.invalid) {
      return;
    }

    this.appService
      .getExchangeCurrency(
        this.form.getRawValue().currency!,
        this.form.getRawValue().date!
      )
      .subscribe((res) => {
        this.currencyExchangeHistory$.next(res);
      });
  }

  clear() {
    this.form.reset();
    this.currencyExchangeHistory$.next(null);
  }
}
