import { default as React } from 'react';
export interface SearchFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 폼 제목 */
    title?: React.ReactNode;
    /** 검색 필드 영역 */
    children?: React.ReactNode;
    /** 버튼 영역 */
    actions?: React.ReactNode;
}
export declare const SearchForm: React.ForwardRefExoticComponent<SearchFormProps & React.RefAttributes<HTMLDivElement>>;
