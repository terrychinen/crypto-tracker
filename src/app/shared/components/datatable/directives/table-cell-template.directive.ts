import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableCellTemplate]',
})
export class TableCellTemplateDirective<T> {
  name = input('', { alias: 'appTableCellTemplate' });
  readonly template = inject(TemplateRef<{ $implicit: T }>);
}
