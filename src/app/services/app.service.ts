import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';
import { format, isWeekend, previousFriday } from 'date-fns';
import { environment } from '../../environments/environment';
import { ExchangeInterfaceResponse } from '../types/exchangeRateResponse.interface';
import { AverageRateResponse } from '../types/avarageRateResponse.interface';
import { CurrencyCodes } from '../enums/currencyCodes.enum';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  private readonly url: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getCurrentExchangeCurrency(
    currencyCode: CurrencyCodes
  ): Observable<ExchangeInterfaceResponse> {
    const isWeekend: boolean = this.checkIfIsWeekend(new Date());
    const lastFriday: string = format(previousFriday(new Date()), 'yyyy-MM-dd');

    const fullUrl: string = !!isWeekend
      ? `${this.url}/exchangerates/rates/c/${currencyCode!.toLowerCase()}/today`
      : `${
          this.url
        }/exchangerates/rates/c/${currencyCode!.toLowerCase()}/${lastFriday}`;

    http: return this.http.get<ExchangeInterfaceResponse>(fullUrl).pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }

  // Current average <currency> exchange rate, calculated on the basis of the last known value
  public getAverageExchangeRate(
    currencyCode: CurrencyCodes
  ): Observable<AverageRateResponse> {
    const fullUrl: string = `${this.url}/exchangerates/rates/a/${String(
      currencyCode
    ).toLowerCase()}/`;

    return this.http.get<AverageRateResponse>(fullUrl).pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }

  // extended data about currency exchange rate (response with buying and selling rates)
  public getExchangeCurrency(
    currencyCode: CurrencyCodes,
    date: string
  ): Observable<ExchangeInterfaceResponse> {
    const fullUrl: string = `${
      this.url
    }/exchangerates/rates/c/${currencyCode!.toLowerCase()}/${date}`;

    return this.http.get<ExchangeInterfaceResponse>(fullUrl).pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }

  private checkIfIsWeekend(date: Date): boolean {
    return isWeekend(date);
  }
}
