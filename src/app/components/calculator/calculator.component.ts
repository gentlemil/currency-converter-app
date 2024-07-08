import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeInterfaceResponse } from '../../types/exchangeRateResponse.interface';
import {
  AsyncPipe,
  DatePipe,
  JsonPipe,
  NgClass,
  NgFor,
  NgIf,
} from '@angular/common';
import { CurrencyCodes } from '../../enums/currencyCodes.enum';
import { AverageRateResponse } from '../../types/avarageRateResponse.interface';

@Component({
  standalone: true,
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    NgClass,
    NgFor,
    DatePipe,
    JsonPipe,
  ],
})
export class CalculatorComponent {
  // TODO: remove default values
  public historyForm = this.fb.group({
    currencyCode: [CurrencyCodes.USD, Validators.required],
    date: ['2024-07-05', Validators.required],
  });

  public calculatorForm = this.fb.group({
    currencyCode: ['', Validators.required], // get from getAverageRates()
    type: ['buy', Validators.required], // needed?
    rates: [null, Validators.required], // needed?
    effectiveDate: ['', Validators.required],
    polishAmount: [1, Validators.required],
    foreignAmount: [0, Validators.required],

    bidRate: [0, Validators.required], // get from getHistoricalRates()
    askRate: [0, Validators.required], // get from getHistoricalRates()
    midRate: [0, Validators.required], // get from getAvaregaRateData
  });

  currencyExchangeHistoryData$ =
    new BehaviorSubject<ExchangeInterfaceResponse | null>(null);
  avaregaRateData$ = new BehaviorSubject<AverageRateResponse | null>(null);

  CurrencyCodes = CurrencyCodes;

  Object = Object;

  constructor(
    private fb: FormBuilder,
    private readonly appService: AppService
  ) {}

  public onSubmitCalculateForm() {
    if (this.historyForm.invalid) {
      return;
    }

    const { currencyCode, date } = this.historyForm.getRawValue();

    // get more detailed data
    this.getAvaregaRateData(currencyCode!).subscribe(
      (res: AverageRateResponse) => {
        this.avaregaRateData$.next(res);

        if (!res) return;

        this.calculatorForm.patchValue({
          currencyCode: CurrencyCodes[res.code],
          effectiveDate: res.rates[0].effectiveDate,
          polishAmount: 1,
          foreignAmount: 0,
          midRate: res.rates[0].mid,
        });
      }
    );

    this.getHistoricalRates();
  }

  // avarega currency rate
  private getAvaregaRateData(
    currencyCode: CurrencyCodes
  ): Observable<AverageRateResponse> {
    return this.appService.getAverageExchangeRate(currencyCode);
  }

  private getHistoricalRates() {
    const { currencyCode, date } = this.historyForm.getRawValue();

    this.appService
      .getExchangeCurrency(currencyCode!, date!)
      .subscribe((res: ExchangeInterfaceResponse) => {
        if (!res) return;

        this.currencyExchangeHistoryData$.next(res);
        console.log(this.currencyExchangeHistoryData$.getValue());

        this.calculatorForm.patchValue({
          bidRate: res.rates[0].bid,
          askRate: res.rates[0].ask,
        });
      });
  }

  clear() {
    this.historyForm.reset();

    this.avaregaRateData$.next(null);
    this.currencyExchangeHistoryData$.next(null);
  }
}
