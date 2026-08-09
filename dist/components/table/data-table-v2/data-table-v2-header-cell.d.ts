import { DataTableV2Column, SortDirection } from './types';
import * as React from "react";
export interface DataTableV2HeaderCellProps<T> {
    column: DataTableV2Column<T>;
    width: number | undefined;
    minWidth: number | undefined;
    leftOffset: number | undefined;
    rightOffset: number | undefined;
    isLeftPinned: boolean;
    isRightPinned: boolean;
    isLeftBoundary: boolean;
    isRightBoundary: boolean;
    isFirstRightPinned: boolean;
    /** 컬럼 재정렬 대상인지 (드래그 핸들 표시) */
    isDraggable: boolean;
    isLastColumn: boolean;
    /**
     * 정렬 상태는 **원시값으로 쪼개서** 받는다.
     * getSortInfo(key) 결과 객체를 그대로 넘기면 매 렌더 새 객체라 memo 가 무효가 된다.
     */
    sortDirection: SortDirection | undefined;
    sortPriority: number | undefined;
    onSort: (key: keyof T) => void;
    /** 이 컬럼의 필터 값 / 활성 여부 — 값으로 받아야 자기 필터가 바뀔 때만 리렌더된다 */
    filterValue: unknown;
    filterActive: boolean;
    onColumnFilterChange: (columnKey: string, value: unknown) => void;
    resizable: boolean;
    isResizing: boolean;
    onResizeStart: (e: React.MouseEvent, column: unknown) => void;
    headerBg: string;
}
type DataTableV2HeaderCellComponent = <T>(props: DataTableV2HeaderCellProps<T>) => React.ReactElement | null;
/**
 * 헤더 셀 — **헤더 행과 별개의 memo 단위**.
 *
 * 헤더 행이 memo 최소 단위이면, 행 체크박스를 하나 누를 때 (전체선택 체크박스 상태가
 * 바뀌므로) 헤더 셀이 전부 다시 그려진다. 정렬 클릭 / 필터 변경도 마찬가지로
 * 관계없는 컬럼까지 번진다.
 *
 * ⚠️ 정렬 상태와 필터 값은 **원시값으로 쪼개서** 받는다. `getSortInfo(key)` 결과
 * 객체를 그대로 넘기면 매 렌더 새 객체라 memo 가 통째로 무효가 된다.
 */
export declare const DataTableV2HeaderCell: DataTableV2HeaderCellComponent;
export {};
