import * as React from "react";
export interface SearchHistoryItem {
    id: string;
    text: string;
}
export interface SearchBarProps {
    /** 플레이스홀더 텍스트 */
    placeholder?: string;
    /** 검색어 */
    value?: string;
    /** 검색어 변경 핸들러 */
    onChange?: (value: string) => void;
    /** 검색 실행 핸들러 (Enter 키) */
    onSearch?: (value: string) => void;
    /** 최근 검색어 목록 */
    recentSearches?: SearchHistoryItem[];
    /** 최근 검색어 클릭 핸들러 */
    onRecentSearchClick?: (item: SearchHistoryItem) => void;
    /** 추가 className */
    className?: string;
    /** 비활성화 */
    disabled?: boolean;
}
declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLInputElement>>;
export { SearchBar };
