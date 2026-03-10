import { default as React } from 'react';
export type SearchFormLayout = "grid" | "flex";
export interface SearchFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 폼 제목 */
    title?: React.ReactNode;
    /** 검색 필드 영역 */
    children?: React.ReactNode;
    /** 버튼 영역 */
    actions?: React.ReactNode;
    /** 레이아웃 타입: grid(4컬럼 고정) | flex(자동 줄바꿈) */
    layout?: SearchFormLayout;
    /** 접기/펴기 가능 여부 */
    collapsible?: boolean;
    /** 접힘 상태 (controlled) */
    collapsed?: boolean;
    /** 초기 접힘 상태 (uncontrolled, collapsible이 true일 때만 동작) */
    defaultCollapsed?: boolean;
    /** 접힌 상태에서 표시할 콘텐츠 (필터 요약 등) */
    collapsedContent?: React.ReactNode;
    /** 접힘 상태 변경 콜백 */
    onCollapseChange?: (collapsed: boolean) => void;
}
export declare const SearchForm: React.ForwardRefExoticComponent<SearchFormProps & React.RefAttributes<HTMLDivElement>>;
