import { SortDirection } from '../table';
import { DataTableColumn, StickyStyleResult } from './types';
import * as React from "react";
export interface DataTableColumnHeaderProps<T> {
    column: DataTableColumn<T>;
    stickyData: StickyStyleResult;
    alignClass: string;
    needsRightBorder: boolean;
    resizable: boolean;
    /** 리사이즈로 적용된 너비 (column.sticky가 false일 때만 사용) */
    resizedWidth: number | undefined;
    /** 현재 이 컬럼이 리사이즈 중인지 */
    isResizing: boolean;
    onResizeStart: (e: React.MouseEvent, column: DataTableColumn<T>) => void;
    /** 컬럼 reorder 가능 여부 (이 컬럼이 드래그 가능한지는 내부에서 sticky/sortable로 결정) */
    columnReorderable: boolean;
    sortDirection: SortDirection;
    sortPriority: number | undefined;
    onSort: () => void;
}
/**
 * 컬럼 헤더 컴포넌트
 * - 일반 / sortable / draggable (컬럼 reorder) 3가지 분기
 * - 리사이즈 핸들 + 그룹 경계 구분선 처리
 */
export declare const DataTableColumnHeader: <T>(props: DataTableColumnHeaderProps<T>) => React.ReactElement;
