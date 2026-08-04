import { DataTableV2Column, FilterConfig } from './types';
interface DataTableV2FilterCellProps<T> {
    column: DataTableV2Column<T>;
    filter: FilterConfig<T>;
    value: unknown;
    active: boolean;
    onChange: (value: unknown) => void;
}
/**
 * 헤더 셀 내 필터 아이콘 + 팝오버 렌더러.
 * filter.type 에 따라 프리셋 필터 컴포넌트 자동 선택. `type: "custom"` 이면 사용처 component 를 렌더.
 * 활성 필터(active) 있을 때 아이콘에 도트 인디케이터 표시.
 */
export declare function DataTableV2FilterCell<T>({ column, filter, value, active, onChange, }: DataTableV2FilterCellProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
