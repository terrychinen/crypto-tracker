// Angular framework imports
import {
  AfterContentInit,
  Component,
  ContentChildren,
  effect,
  input,
  output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

// Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

// Intefraces
import { TableColumn } from './interfaces';

// Directives
import { TableCellTemplateDirective } from './directives/table-cell-template.directive';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  imports: [
    NgTemplateOutlet,

    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class DatatableComponent<T> implements AfterContentInit {
  data = input<T[]>([]);
  columns = input<TableColumn[]>([]);

  rowClicked = output<T>();

  dataSource = new MatTableDataSource<T>();
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    if (paginator) this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    if (sort) this.dataSource.sort = sort;
  }

  @ContentChildren(TableCellTemplateDirective)
  templates!: QueryList<TableCellTemplateDirective<T>>

  templateMap: Record<string, TableCellTemplateDirective<T>> = {};

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  ngAfterContentInit(): void {
    this.templates.forEach((template) => {
      this.templateMap[template.name()] = template;
    });

    this.displayedColumns = this.columns().map(c => c.def);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row: T): void {
    this.rowClicked.emit(row);
  }
}
