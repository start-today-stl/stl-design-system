import { DataTableColumn, EditingCell, RowActionsConfig, RowGroupConfig, StickyStyleResult } from './types';
import * as React from "react";
export interface DataTableBodyRowProps<T extends {
    id: string | number;
}> {
    /** 현재 행 데이터 */
    row: T;
    /** 행 인덱스 */
    rowIndex: number;
    /** 데이터 길이 (그룹 셀 마지막 행 판정용) */
    dataLength: number;
    /** 이 행이 선택되었는지 */
    isSelected: boolean;
    /** 이 행이 확장 가능한지 */
    canExpand: boolean;
    /** 이 행이 확장되었는지 */
    isExpanded: boolean;
    /** 이 행에서 편집 중인 셀 (null이면 편집 안 함) */
    editingCell: EditingCell<T> | null;
    /** 편집 중인 값 */
    editValue: unknown;
    /** 편집 값 ref (stale closure 방지) */
    editValueRef: React.MutableRefObject<unknown>;
    /** 편집 중인 셀 ref (외부 클릭 감지용) */
    editingCellRef: React.RefObject<HTMLTableCellElement | null>;
    columnsToRender: DataTableColumn<T>[];
    rowReorderable: boolean;
    selectable: boolean;
    expandable: boolean;
    showRowDelete: boolean;
    hasLeftStickyColumns: boolean;
    resizable: boolean;
    rowActions: RowActionsConfig<T> | undefined;
    rowGrouping: RowGroupConfig<T> | undefined;
    middleRowSet: Set<number> | null;
    getCheckboxHeaderLeftOffset: () => number;
    getExpandHeaderLeftOffset: () => number;
    getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined;
    isGroupCellHovered: (rowIndex: number, rowSpan: number) => boolean;
    isGroupCellSelected: (rowIndex: number, rowSpan: number) => boolean;
    getStickyStyles: (column: DataTableColumn<T>, isHeader: boolean, isSelected?: boolean, groupCellSelected?: boolean) => StickyStyleResult;
    getColumnWidth: (column: DataTableColumn<T>) => number | undefined;
    getAlignClass: (align?: "left" | "center" | "right") => string;
    handleSelectRow: (id: string | number) => void;
    toggleRowExpanded: (id: string | number) => void;
    startEditing: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void;
    completeEditing: (column: DataTableColumn<T>, row: T) => void;
    cancelEditing: () => void;
    setEditValue: (value: T[keyof T] | null) => void;
    setEditingCell: (cell: EditingCell<T> | null) => void;
    onCellChange: ((rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void) | undefined;
    onRowClick: ((row: T) => void) | undefined;
    rowClassName: ((row: T) => string) | undefined;
    setHoveredRowIndex: (index: number | null) => void;
}
/**
 * 데이터 행 컴포넌트 (React.memo로 메모이제이션됨)
 *
 * 행 데이터(row), 선택/확장 상태, 편집 상태 등이 변경되지 않으면
 * 다른 행이나 테이블 전체가 re-render되어도 이 행은 스킵됩니다.
 *
 * 효과적인 메모이제이션을 위해 다음 조건 필요:
 * - row 객체 reference 안정 (불변 업데이트)
 * - 콜백 함수들 안정 (parent useCallback)
 * - 헬퍼 함수들 안정 (useCallback/useMemo)
 */
export declare const DataTableBodyRow: <T extends {
    id: string | number;
}>(props: DataTableBodyRowProps<T>) => React.ReactElement;
