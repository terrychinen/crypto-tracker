// Angular framework imports
import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgClass, PercentPipe, UpperCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Services
import { CryptoService } from '@crypto/services/crypto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports : [
    CurrencyPipe,
    PercentPipe,
    UpperCasePipe,
    NgClass,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardComponent {
  private _cryptoService = inject(CryptoService);

  coins = toSignal(this._cryptoService.getTop100Coins(), { initialValue: [] });

  displayedColumns: string[] = [
    'name',
    'current_price',
    'price_change_percentage_24h',
    'total_volume',
  ];
}
