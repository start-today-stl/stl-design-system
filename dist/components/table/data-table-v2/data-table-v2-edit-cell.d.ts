import { DataTableV2Column } from './types';
interface DataTableV2EditCellProps<T extends {
    id: string | number;
}> {
    row: T;
    column: DataTableV2Column<T>;
    /** 검증 실패 메시지 (부모가 보관) */
    error?: string;
    /** 편집 확정 (Enter / blur). 현재 편집값을 인자로 넘긴다 */
    onComplete: (column: DataTableV2Column<T>, row: T, value: T[keyof T]) => void;
    /** 편집 취소 (Escape) */
    onCancel: () => void;
    /** 값이 바뀌어서 기존 에러를 지워야 할 때 */
    onClearError: () => void;
}
/**
 * 편집 중인 셀 wrapper.
 *
 * 편집 임시값 (editValue) 을 **이 컴포넌트의 로컬 state 로 보관** 한다.
 * 부모 (DataTableV2) 가 값을 들고 있으면 타이핑 한 글자마다 부모가 리렌더되고,
 * 헤더는 부모 JSX 안에서 인라인으로 그려지므로 헤더 전체가 매 글자마다 다시 그려진다.
 * 부모는 "어느 셀이 편집 중인가" (rowId + columnKey) 와 검증 에러만 알면 된다.
 *
 * `EditComponentProps` 계약 (value / onChange / onComplete / onCancel / row / error) 은
 * 그대로 유지되므로 사용처의 커스텀 `editComponent` 는 영향 없음.
 */
export declare function DataTableV2EditCell<T extends {
    id: string | number;
}>({ row, column, error, onComplete, onCancel, onClearError, }: DataTableV2EditCellProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
