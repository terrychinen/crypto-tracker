export interface TableColumn {
  def: string;
  header: string;
  cellType?: 'text' | 'currency' | 'percent' | 'image-text';
}
