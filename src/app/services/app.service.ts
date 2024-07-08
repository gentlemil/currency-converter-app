import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExchangeInterfaceResponse } from '../types/exchangeRateResponse.interface';
import { AverageRateResponse } from '../types/avarageRateResponse.interface';
import { Table } from '../types/table.type';
import { CurrencyCodes } from '../enums/currencyCodes.enum';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  private readonly table: Table = 'a'; // set 'a' by default
  private readonly url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // today exchange currency
  getCurrentExchangeCurrency(
    currencyCode: CurrencyCodes
  ): Observable<ExchangeInterfaceResponse> {
    this.isLoading$.next(true);
    const fullUrl = `${this.url}/exchangerates/rates/${
      this.table
    }/${currencyCode!.toLowerCase()}/today`;
    return this.http.get<ExchangeInterfaceResponse>(fullUrl).pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }

  // Current average <currency> exchange rate, calculated on the basis of the last known value
  getAverageExchangeRate(
    currencyCode: CurrencyCodes
  ): Observable<AverageRateResponse> {
    // this.isLoading$.next(true);
    const fullUrl = `${this.url}/exchangerates/rates/${this.table}/${String(
      currencyCode
    ).toLowerCase()}/`;
    return this.http.get<AverageRateResponse>(fullUrl);
  }

  // extended data about currency exchange rate (response with buying and selling rates)
  getExchangeCurrency(
    currencyCode: CurrencyCodes,
    date: string
  ): Observable<ExchangeInterfaceResponse> {
    this.isLoading$.next(true);
    const fullUrl = `${
      this.url
    }/exchangerates/rates/c/${currencyCode!.toLowerCase()}/${date}`;
    return this.http.get<ExchangeInterfaceResponse>(fullUrl);
  }
}
