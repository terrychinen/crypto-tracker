// Angular framework imports
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Third-party libraries
import { Observable } from 'rxjs';

// Interfaces
import { Coin, MarketParams } from '@app/features/crypto/interfaces';

// Environments
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private _http = inject(HttpClient);
  private _apiUrl = `${environment.apiUrl}/coins`;

  getTop100Coins(params: MarketParams = {}): Observable<Coin[]> {
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
}
