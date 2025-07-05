import { Component, output } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-table-filter',
  imports: [MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="filter-field">
      <mat-label>Search</mat-label>
      <input matInput (keyup)="onFilterChange($event)" #input />
    </mat-form-field>
  `,
})
export class TableFilterComponent {
  filterChange = output<string>();

  onFilterChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterChange.emit(filterValue);
  }
}
