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
}
export declare const SearchForm: React.ForwardRefExoticComponent<SearchFormProps & React.RefAttributes<HTMLDivElement>>;
