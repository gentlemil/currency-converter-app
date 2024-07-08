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
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyCodes } from '../../enums/currencyCodes.enum';
import { CurrentExchangeRatesComponent } from '../../components/currentExchangeRates/currentExchangeRates.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CalculatorComponent } from '../../components/calculator/calculator.component';

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
    CalculatorComponent,
  ],
})
export class DashboardComponent implements OnInit {
  isLoading$ = this.appService.isLoading$;

  availableCurrencies = [];

  CurrencyCodes = CurrencyCodes;
  convertTypes = ['buy', 'sell'];

  convertResult$ = new BehaviorSubject<number | null>(null);

  public dateField = new FormControl();

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
    currency: CurrencyCodes,
    date: string
  ): Observable<ExchangeInterfaceResponse> {
    return this.appService.getExchangeCurrency(currency, date);
  }

  convertCurrency() {}
}
