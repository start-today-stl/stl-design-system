import { DataTableV2Column } from '../types';
interface UseCellEditOptions<T extends {
    id: string | number;
}> {
    onCellChange?: (rowId: T["id"], columnKey: keyof T, value: T[keyof T]) => void;
}
/**
 * 셀 편집 상태 hook.
 *
 * **편집 임시값 (editValue) 은 여기에 두지 않는다.** 값은 `DataTableV2EditCell` 의
 * 로컬 state 이고, 이 훅은 "어느 셀이 편집 중인가" (rowId + columnKey) 와 검증 에러만
 * 관리한다. 값을 여기에 두면 타이핑 한 글자마다 그리드 전체 (헤더 포함) 가 리렌더된다.
 *
 * 따라서 부모 리렌더는 편집 시작 / 확정 / 취소 / 검증 실패 시점에만 발생한다.
 *
 * - completeEdit: 값이 그대로면 그냥 종료. validate 통과 시 onCellChange 호출 + 종료.
 *   실패 시 에러만 세팅하고 편집 유지.
 * - clearError: 에러 표시 중 값이 바뀌면 에러 해제 (EditCell 이 필요할 때만 호출).
 * - cancelEdit: 저장 없이 종료.
 */
export declare function useCellEdit<T extends {
    id: string | number;
}>({ onCellChange, }: UseCellEditOptions<T>): {
    editing: {
        rowId: T["id"];
        columnKey: keyof T;
        error?: string | undefined;
    } | null;
    startEdit: (row: T, col: DataTableV2Column<T>) => void;
    clearError: () => void;
    completeEdit: (col: DataTableV2Column<T>, row: T, value: T[keyof T]) => void;
    cancelEdit: () => void;
};
export {};
