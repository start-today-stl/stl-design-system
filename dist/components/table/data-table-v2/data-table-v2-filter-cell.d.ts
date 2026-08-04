import { DataTableV2Column, FilterConfig } from './types';
interface DataTableV2FilterCellProps<T> {
    column: DataTableV2Column<T>;
    filter: FilterConfig<T>;
    value: unknown;
    active: boolean;
    /**
     * 필터 값 변경 콜백 — parent 의 stable ref (`useCallback` 결과).
     * (인라인 arrow 로 넘기면 매 렌더마다 새 ref → React.memo 실패 → 리렌더)
     * 내부에서 columnKey 와 함께 useCallback 으로 wrap 해 onChange 안정화.
     */
    onChange: (columnKey: string, value: unknown) => void;
    /** 이 셀이 담당하는 컬럼 키 — onChange 에 전달 */
    columnKey: string;
}
/**
 * 헤더 셀 내 필터 아이콘 + 팝오버 렌더러.
 * filter.type 에 따라 프리셋 필터 컴포넌트 자동 선택. `type: "custom"` 이면 사용처 component 를 렌더.
 * 활성 필터(active) 있을 때 아이콘에 도트 인디케이터 표시.
 */
declare function DataTableV2FilterCellInner<T>({ column, filter, value, active, onChange, columnKey, }: DataTableV2FilterCellProps<T>): import("react/jsx-runtime").JSX.Element;
export declare const DataTableV2FilterCell: typeof DataTableV2FilterCellInner;
export {};
