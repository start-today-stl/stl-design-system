import { DataTableV2Props } from './types';
/** DataTable v2 — div role=grid 기반 그리드 컨테이너 */
export declare function DataTableV2<T extends {
    id: string | number;
}>({ data, columns: rawColumns, headerGroups, sortState, onSortChange, multiSort, resizable, columnWidths, onColumnResize, columnReorderable, columnOrder, onColumnReorder, selectable, selectedIds, defaultSelectedIds, onSelectionChange, onRowClick, rowClassName, expandable, maxHeight, estimateRowHeight, className, }: DataTableV2Props<T>): import("react/jsx-runtime").JSX.Element;
