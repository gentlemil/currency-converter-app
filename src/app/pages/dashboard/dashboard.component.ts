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
import { CurrentExchangeRatesComponent } from '../../components/currentExchangeRates/currentExchangeRates.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    CurrentExchangeRatesComponent,
  ],
})
export class DashboardComponent implements OnInit {
  isLoading$ = this.appService.isLoading$;

  availableCurrencies = [];

  CurrencyCodes = CurrencyCodes;
  convertTypes = ['buy', 'sell'];

  convertResult$ = new BehaviorSubject<number | null>(null);

  Object = Object;

  currencyExchangeHistory$ =
    new BehaviorSubject<ExchangeInterfaceResponse | null>(null);

  public dateField = new FormControl();

  public form = this.fb.group({
    currency: ['', Validators.required],
    date: ['', Validators.required],
  });

  public convertForm = this.fb.group({
    polishAmount: ['', Validators.required],
    foreignAmount: ['', Validators.required],
    sellPrice: [0, Validators.required],
    buyPrice: [0, Validators.required],
    currency: ['', Validators.required],
    type: ['buy', Validators.required],
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
    console.log(this.form.getRawValue());

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
        this.convertForm.get('currency')?.setValue(res.code);
      });
  }

  clear() {
    this.form.reset();
    this.currencyExchangeHistory$.next(null);
  }

  convertCurrency() {}
}
