// Angular framework imports
import { Component, effect, inject, ViewChild } from '@angular/core';
import { CurrencyPipe, NgClass, PercentPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';

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

    RouterLink,

    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardComponent {
  private _cryptoService = inject(CryptoService);

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  displayedColumns: string[] = [
    'name',
    'current_price',
    'price_change_percentage_24h',
    'total_volume',
  ];

  
  coins = toSignal(this._cryptoService.getTop100Coins(), { initialValue: [] });
  
  dataSource = new MatTableDataSource(this.coins());

  constructor() {
    effect(() => {
      this.dataSource.data = this.coins();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
