import { DataTableColumn, EditingCell, StickyStyleResult } from './types';
import * as React from "react";
export interface DataTableCellProps<T extends {
    id: string | number;
}> {
    row: T;
    rowIndex: number;
    column: DataTableColumn<T>;
    value: T[keyof T];
    isSelected: boolean;
    /** rowSpan (병합 시) */
    rowSpan: number | undefined;
    /** rowSpan > 1 여부 */
    hasRowSpan: boolean;
    /** 그룹 셀 hover (rowSpan 있을 때만 의미) */
    groupCellHovered: boolean;
    /** 그룹 셀 selected (rowSpan 있을 때만 의미) */
    groupCellSelected: boolean;
    /** 이 셀이 현재 편집 중인지 */
    isEditing: boolean;
    /** 편집 시작 핸들러 */
    onStartEdit: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void;
    /** 편집 중일 때 값 */
    editValue: T[keyof T] | null;
    editingCell: EditingCell<T> | null;
    setEditValue: (value: T[keyof T] | null) => void;
    setEditingCell: (cell: EditingCell<T> | null) => void;
    editValueRef: React.MutableRefObject<unknown>;
    editingCellRef: React.RefObject<HTMLTableCellElement | null>;
    completeEditing: (column: DataTableColumn<T>, row: T) => void;
    cancelEditing: () => void;
    onCellChange: ((rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void) | undefined;
    /** sticky 스타일 결과 */
    stickyData: StickyStyleResult;
    /** 셀 스타일 (sticky + body width) */
    cellStyle: React.CSSProperties;
    /** align 클래스 */
    alignClass: string;
    /** 그룹 셀이 테이블 마지막 행까지 걸쳐있는지 */
    isGroupSpanToEnd: boolean;
}
/**
 * 셀 컴포넌트 (React.memo)
 *
 * 행 컴포넌트 안에서 각 셀이 독립적으로 메모이즈됨.
 * 동일한 row 안에서도 변경된 셀만 re-render되도록 함.
 */
export declare const DataTableCell: <T extends {
    id: string | number;
}>(props: DataTableCellProps<T>) => React.ReactElement;
