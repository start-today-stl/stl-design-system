import { DateRange } from 'react-day-picker';
import { FilterOption } from './types';
/**
 * v2 컬럼 헤더 필터에서 사용하는 기본 프리셋 컴포넌트 5종.
 * 사용처는 column.filter.type 만 지정하면 이 컴포넌트가 자동으로 렌더됨.
 * 특수 케이스는 { type: "custom", component } 이스케이프 해치로 처리.
 */
interface DefaultFilterProps<V = unknown> {
    value: V | undefined;
    onChange: (value: V | undefined) => void;
    onClose: () => void;
}
/** 텍스트 필터 — 단순 문자열 검색 */
export declare function DefaultTextFilter({ value, onChange, onClose, placeholder, }: DefaultFilterProps<string> & {
    placeholder?: string;
}): import("react/jsx-runtime").JSX.Element;
/** 셀렉트 필터 — 단일 값 선택 */
export declare function DefaultSelectFilter({ value, onChange, onClose, options, placeholder, emptyMessage, searchable, }: DefaultFilterProps<string> & {
    options: FilterOption[];
    placeholder?: string;
    emptyMessage?: string;
    searchable?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/** 멀티셀렉트 필터 — 여러 값 선택 */
export declare function DefaultMultiSelectFilter({ value, onChange, onClose, options, placeholder, emptyMessage, searchable, }: DefaultFilterProps<string[]> & {
    options: FilterOption[];
    placeholder?: string;
    emptyMessage?: string;
    searchable?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/** 날짜 범위 필터 */
export declare function DefaultDateRangeFilter({ value, onChange, onClose, }: DefaultFilterProps<DateRange>): import("react/jsx-runtime").JSX.Element;
/** 숫자 범위 필터 — from/to 두 개 입력 */
export declare function DefaultNumberRangeFilter({ value, onChange, onClose, }: DefaultFilterProps<{
    from?: number;
    to?: number;
}>): import("react/jsx-runtime").JSX.Element;
export {};
