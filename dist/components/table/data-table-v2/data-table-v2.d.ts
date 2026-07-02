import { DataTableV2Props } from './types';
/** DataTable v2 — div role=grid 기반 그리드 컨테이너 */
export declare function DataTableV2<T extends {
    id: string | number;
}>({ data, columns, headerGroups, sortState, onSortChange, multiSort, maxHeight, estimateRowHeight, className, }: DataTableV2Props<T>): import("react/jsx-runtime").JSX.Element;
