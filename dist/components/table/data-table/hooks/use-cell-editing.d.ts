import { DataTableColumn, EditingCell } from '../types';
import * as React from "react";
interface UseCellEditingOptions<T extends {
    id: string | number;
}> {
    columns: DataTableColumn<T>[];
    data: T[];
    onCellChange?: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void;
}
/**
 * 셀 편집 hook
 * - 편집 시작/완료/취소 처리
 * - 외부 클릭 시 자동 저장 (Radix 포털 셀렉트 내부 클릭은 제외)
 * - stale closure 방지를 위한 ref 관리
 */
export declare function useCellEditing<T extends {
    id: string | number;
}>({ columns, data, onCellChange, }: UseCellEditingOptions<T>): {
    editingCell: EditingCell<T> | null;
    editValue: T[keyof T] | null;
    editValueRef: React.MutableRefObject<T[keyof T] | null>;
    editingCellRef: React.RefObject<HTMLTableCellElement>;
    setEditingCell: React.Dispatch<React.SetStateAction<EditingCell<T> | null>>;
    setEditValue: React.Dispatch<React.SetStateAction<T[keyof T] | null>>;
    startEditing: (rowId: string | number, columnKey: keyof T, currentValue: T[keyof T]) => void;
    completeEditing: (column: DataTableColumn<T>, row: T) => void;
    cancelEditing: () => void;
};
export {};
