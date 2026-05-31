import { GroupCellFlags } from './hooks/use-row-grouping';
import { DataTableColumn, EditingCell, RowGroupConfig, StickyStyleResult } from './types';
import * as React from "react";
/**
 * 행 컴포넌트가 사용하는 테이블 레벨 컨텍스트.
 * useMemo로 한 번에 안정화하여 React.memo 비교 비용을 줄이고
 * 행 데이터/상태가 같으면 row가 re-render되지 않도록 함.
 */
export interface DataTableBodyRowContext<T extends {
    id: string | number;
}> {
    columnsToRender: DataTableColumn<T>[];
    rowReorderable: boolean;
    selectable: boolean;
    expandable: boolean;
    showRowDelete: boolean;
    hasLeftStickyColumns: boolean;
    resizable: boolean;
    /** rowActions.onRowDelete 를 ref 흡수한 stable callback (사용처 inline 도 안전) */
    onRowDelete: ((row: T) => void) | undefined;
    rowGrouping: RowGroupConfig<T> | undefined;
    middleRowSet: Set<number> | null;
    dataLength: number;
    getCheckboxHeaderLeftOffset: () => number;
    getExpandHeaderLeftOffset: () => number;
    getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined;
    getStickyStyles: (column: DataTableColumn<T>, isHeader: boolean, isSelected?: boolean, groupCellSelected?: boolean) => StickyStyleResult;
    getColumnWidth: (column: DataTableColumn<T>) => number | undefined;
    getAlignClass: (align?: "left" | "center" | "right") => string;
    /** id: row.id, rowIndex: 0-based data index, shiftKey: Shift+클릭 시 true (범위 선택) */
    handleSelectRow: (id: string | number, rowIndex: number, shiftKey: boolean) => void;
    toggleRowExpanded: (id: string | number) => void;
    startEditing: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void;
    completeEditing: (column: DataTableColumn<T>, row: T) => void;
    cancelEditing: () => void;
    setEditValue: (value: T[keyof T] | null) => void;
    setEditingCell: (cell: EditingCell<T> | null) => void;
    editValueRef: React.MutableRefObject<unknown>;
    editingCellRef: React.RefObject<HTMLTableCellElement | null>;
    onCellChange: ((rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void) | undefined;
    onRowClick: ((row: T) => void) | undefined;
    rowClassName: ((row: T) => string) | undefined;
    setHoveredRowIndex: (index: number | null) => void;
}
export interface DataTableBodyRowProps<T extends {
    id: string | number;
}> {
    /** 현재 행 데이터 */
    row: T;
    /** 행 인덱스 */
    rowIndex: number;
    isSelected: boolean;
    canExpand: boolean;
    isExpanded: boolean;
    /** 이 행에서 편집 중인 셀 (다른 행은 null) */
    editingCell: EditingCell<T> | null;
    /** 편집 중인 값 (편집 중인 행에서만 의미) */
    editValue: unknown;
    /** 테이블 레벨 컨텍스트 (useMemo로 안정화) */
    ctx: DataTableBodyRowContext<T>;
    /**
     * 가상화: TableRow DOM 요소에 부착할 ref (보통 virtualizer.measureElement).
     * 가상화 비활성 시엔 생략.
     */
    rowRef?: (el: HTMLTableRowElement | null) => void;
    /**
     * 가상화: virtualizer.measureElement 가 ResizeObserver 로 측정 시 사용하는 인덱스 식별자.
     * 가상화 활성 시 virtualItem.index 를 넘김.
     */
    dataIndex?: number;
    /**
     * rowGrouping 그룹 head 행의 머지 셀별 selected/hovered flag.
     * parent 에서 미리 계산해 전달 — 그룹 내 selected/hover 변경 시 해당 head 행만 부분 리렌더.
     */
    groupCellFlags?: GroupCellFlags;
}
/**
 * 데이터 행 컴포넌트 (React.memo + custom equality)
 *
 * 다음 조건에서 re-render 스킵:
 * - row reference 동일 (불변 업데이트 시 변경 없는 행)
 * - isSelected, isExpanded, canExpand 동일
 * - 이 행이 편집 중이 아니고 다른 행이 편집 중이면 영향 없음
 * - ctx reference 동일 (useMemo로 안정화 필요)
 */
export declare const DataTableBodyRow: <T extends {
    id: string | number;
}>(props: DataTableBodyRowProps<T>) => React.ReactElement;
