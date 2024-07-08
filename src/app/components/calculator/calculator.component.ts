import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  EMPTY,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AppService } from '../../services/app.service';
import { ExchangeInterfaceResponse } from '../../types/exchangeRateResponse.interface';
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
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgFor,
    DatePipe,
  ],
})
export class CalculatorComponent {
  public historyForm = this.fb.group({
    currencyCode: [null, Validators.required],
    date: ['', Validators.required],
  });

  public calculatorForm = this.fb.group({
    currencyCode: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    ],
    currencyFullName: ['', Validators.required],
    effectiveDate: ['', Validators.required],
    polishAmount: [0, Validators.required],
    foreignAmount: [0, Validators.required],

    bidRate: [0, Validators.required],
    askRate: [0, Validators.required],
    midRate: [0, Validators.required],
  });

  public calcResult$: Observable<{ foreign: any; polish: any }> = combineLatest(
    {
      foreign:
        this.calculatorForm.get('polishAmount')?.valueChanges.pipe(
          debounceTime(300),
          tap((val: number | null) => {
            val !== 0 &&
              this.calculatorForm
                .get('foreignAmount')!
                .setValue(0, { emitEvent: false });
            this.calculate(
              val!,
              this.calculatorForm.get('askRate')?.value!
            ).buy();
          })
        ) || EMPTY,
      polish:
        this.calculatorForm.get('foreignAmount')?.valueChanges.pipe(
          debounceTime(300),
          tap((val: number | null) => {
            val !== 0 &&
              this.calculatorForm
                .get('polishAmount')!
                .setValue(0, { emitEvent: false });
            this.calculate(
              val!,
              this.calculatorForm.get('bidRate')?.value!
            ).sell();
          })
        ) || EMPTY,
    }
  );

  calculatorEnabled$ = new BehaviorSubject<boolean>(false);
  private _destroy$ = new Subject<void>();

  public readonly CurrencyCodes = CurrencyCodes;
  Object = Object;

  constructor(
    private fb: FormBuilder,
    private readonly appService: AppService
  ) {}

  public calculate(
    amount: number,
    rate: number
  ): {
    buy: () => void;
    sell: () => void;
  } {
    const ctx = this;

    const result: number = parseFloat(
      ((amount * rate + 10000) / 10000).toFixed(5)
    );

    function buy(): void {
      return ctx.calculatorForm
        .get('foreignAmount')!
        .setValue(+result, { emitEvent: false });
    }

    function sell(): void {
      return ctx.calculatorForm
        .get('polishAmount')!
        .setValue(+result, { emitEvent: false });
    }

    return { buy, sell };
  }

  public onSubmitCalculateForm(): void {
    if (this.historyForm.invalid) return;

    const { currencyCode, date } = this.historyForm.getRawValue();

    this.historyForm.reset();

    this.getAvaregaRateData(currencyCode!)
      .pipe(
        takeUntil(this._destroy$),
        switchMap((res) => {
          if (!res) return of(null);

          this.calculatorForm.patchValue({
            currencyCode: CurrencyCodes[res.code],
            currencyFullName: res.currency,
            effectiveDate: date!,
            polishAmount: 1,
            foreignAmount: 0,
            midRate: res.rates[0].mid,
          });

          return this.getHistoricalRates(CurrencyCodes[res.code], date!);
        }),
        tap((res) => {
          if (!res) return;

          this.calculatorForm.patchValue({
            bidRate: res.rates[0].bid,
            askRate: res.rates[0].ask,
          });
          this.calculatorEnabled$.next(!!res);
        })
      )
      .subscribe((res: ExchangeInterfaceResponse | null) => {
        this.calculatorEnabled$.next(!!res);
      });
  }

  public getAvaregaRateData(
    currencyCode: CurrencyCodes
  ): Observable<AverageRateResponse> {
    return this.appService.getAverageExchangeRate(currencyCode);
  }

  public getHistoricalRates(
    currencyCode: CurrencyCodes,
    date: string
  ): Observable<ExchangeInterfaceResponse> {
    return this.appService.getExchangeCurrency(currencyCode, date);
  }

  public clear(): void {
    this.historyForm.reset();
    this.calculatorForm.reset();
    this.calculatorEnabled$.next(false);
  }

  public ngOnDestroy(): void {
    this.clear();
    this._destroy$.next();
    this._destroy$.complete();
  }
}
