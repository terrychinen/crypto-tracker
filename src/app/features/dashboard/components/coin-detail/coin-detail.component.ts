// Angular framework imports
import { Component, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Third-party libraries
import { map, switchMap } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData as Ng2ChartData, ChartOptions } from 'chart.js';

// Services
import { CryptoService } from '@crypto/services/crypto.service';

@Component({
  selector: 'app-coin-detail',
  standalone: true,
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss',
  imports: [
    TitleCasePipe,
    RouterLink,

    MatButtonModule,
    MatProgressSpinnerModule,

    BaseChartDirective
  ],
})
export class CoinDetailComponent {
  private _route = inject(ActivatedRoute);
  private _cryptoService = inject(CryptoService);

  private _params$ = this._route.paramMap;

  coinId = toSignal(
    this._params$.pipe(map((params => params.get('id') ?? '')))
  );

  private _chartDataSource = toSignal(
    this._params$.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) return [];
        return this._cryptoService.getCoinChartData(id);
      }),
    )
  );

  chartData = computed<Ng2ChartData<'line'>>(() => {
    const sourceData = this._chartDataSource();
    if (!sourceData) {
      return { labels: [], datasets: [] }
    }
    
    return {
      labels: sourceData.prices.map((p: [number, number]) =>
        new Date(p[0]).toLocaleDateString()
      ),
      datasets: [
        {
          data: sourceData.prices.map((p: [number, number]) => p[1]),
          label: 'Precio (USD)',
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.3)',
          fill: true,
        },
      ],
    };
  });

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
}
