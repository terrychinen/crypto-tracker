// Angular framework imports
import { Component, inject } from '@angular/core';
import { CurrencyPipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

// Services
import { CryptoService } from '@crypto/services/crypto.service';

// Interfaces
import { Coin } from '@crypto/interfaces';

// Shared
import { DatatableComponent } from '@shared/components/datatable/datatable.component';
import { TableColumn } from '@shared/components/datatable/interfaces/table-column';
import { TableCellTemplateDirective } from '@app/shared/components/datatable/directives/table-cell-template.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports : [
    DatatableComponent,

    CurrencyPipe,
    PercentPipe,
    UpperCasePipe,

    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,

    TableCellTemplateDirective,
  ],
})
export class DashboardComponent {
  private _router = inject(Router);
  private _cryptoService = inject(CryptoService);

  coins = toSignal(this._cryptoService.getMarketData(), { initialValue: [] });

  tableColumns: TableColumn[] = [
    { def: 'name', header: 'Coin', cellType: 'image-text' },
    { def: 'current_price', header: 'Current price', cellType: 'currency' },
    { def: 'price_change_percentage_24h', header: 'Change 24h', cellType: 'percent' },
    { def: 'total_volume', header: 'Total volume 24h', cellType: 'currency' },
  ];

  handleRowClick(row: Coin): void {
    this._router.navigate(['/coin', row.id]);
  }
}
