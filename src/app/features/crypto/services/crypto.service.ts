// Angular framework imports
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Third-party libraries
import { Observable } from 'rxjs';

// Interfaces
import {
  ChartData,
  ChartParams,
  Coin,
  MarketParams,
} from '@crypto/interfaces';

// Environments
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/coins`;

  getTop100Coins(
    params: MarketParams = {}
  ): Observable<Coin[]> {
    const url = `${this._apiUrl}/markets`;

    const defaultParams: MarketParams = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
    };

    const requestParams = { ...defaultParams, ...params };

    return this._http.get<Coin[]>(url, {
      params: new HttpParams({ fromObject: requestParams })
    });
  }


  /**
   * Gets the historical data of a currency for the chart.
   * @param coinId The ID of the currency (e.g., ‘bitcoin’).
   * @param options An object with options for the query (currency and days).
   * @returns An Observable with the chart data.
   */
  getCoinChartData(
    coinId: string,
    options: ChartParams = {}
  ): Observable<ChartData> {
    const { vs_currency = 'usd', days = 30 } = options;

    const url = `${this._apiUrl}/${coinId}/market_chart`;
    const params = { vs_currency, days: days.toString() };

    return this._http.get<ChartData>(url, { params });
  }
}
