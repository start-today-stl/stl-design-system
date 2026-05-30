import { EditComponentProps, ValidationResult, DataTableColumn, HeaderGroup, RowGroupConfig, SortState, ExpandableConfig, RowActionsConfig, DataTableProps } from './types';
export type { EditComponentProps, ValidationResult, DataTableColumn, HeaderGroup, RowGroupConfig, SortState, ExpandableConfig, RowActionsConfig, DataTableProps, };
declare function DataTable<T extends {
    id: string | number;
}>({ columns, data, selectable, selectedIds, onSelectionChange, sortState, onSortChange, multiSort, onRowClick, onCellChange, expandable, emptyMessage, className, rowClassName, maxHeight, resizable, columnWidths, onColumnResize, columnReorderable, columnOrder, onColumnReorder, rowReorderable: rowReorderableProp, onRowReorder, loading, loadingMode, loadingContent, headerGroups, rowGrouping, rowActions, virtual, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export { DataTable };
