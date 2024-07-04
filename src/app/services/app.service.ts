import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExchangeInterfaceResponse } from '../types/exchangeRateResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // today exchange currency
  getCurrentExchangeCurrency(
    currency: string
  ): Observable<ExchangeInterfaceResponse> {
    const fullUrl = `${this.url}/exchangerates/rates/c/${currency}/today`;
    return this.http.get<ExchangeInterfaceResponse>(fullUrl);
  }

  getExchangeCurrency(
    currency: string,
    date: string
  ): Observable<ExchangeInterfaceResponse> {
    const fullUrl = `${this.url}/exchangerates/rates/c/${currency}/${date}`;
    return this.http.get<ExchangeInterfaceResponse>(fullUrl);
  }
}
