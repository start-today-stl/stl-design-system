import { DataTableV2Column } from '../types';
interface UseCellEditOptions<T extends {
    id: string | number;
}> {
    onCellChange?: (rowId: T["id"], columnKey: keyof T, value: T[keyof T]) => void;
}
/**
 * 셀 편집 상태 hook.
 * - 하나의 셀만 편집 상태 유지 (rowId + columnKey)
 * - 편집 중 임시 값 (editValue) 관리
 * - onComplete: validate 통과 시 onCellChange 호출 + 편집 종료. 실패 시 에러 유지.
 * - onCancel: 편집 종료 (값 저장 안 함)
 */
export declare function useCellEdit<T extends {
    id: string | number;
}>({ onCellChange, }: UseCellEditOptions<T>): {
    editing: {
        rowId: T["id"];
        columnKey: keyof T;
        editValue: T[keyof T];
        error?: string | undefined;
    } | null;
    isEditing: (rowId: T["id"], columnKey: keyof T) => boolean;
    getEditingState: (rowId: T["id"], columnKey: keyof T) => {
        editValue: T[keyof T];
        error?: string;
    } | null;
    startEdit: (row: T, col: DataTableV2Column<T>) => void;
    changeEditValue: (value: T[keyof T]) => void;
    completeEdit: (col: DataTableV2Column<T>, row: T) => void;
    cancelEdit: () => void;
};
export {};
