import * as React from "react";
export interface PaginationFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 현재 페이지 (1-based) */
    currentPage: number;
    /** 전체 페이지 수 */
    totalPages: number;
    /** 페이지 변경 핸들러 */
    onPageChange?: (page: number) => void;
    /** 전체 아이템 개수 */
    totalItems?: number;
    /** 현재 페이지 사이즈 */
    pageSize?: number;
    /** 페이지 사이즈 옵션들 */
    pageSizeOptions?: number[];
    /** 페이지 사이즈 변경 핸들러 */
    onPageSizeChange?: (size: number) => void;
    /** Previous 버튼 텍스트 */
    previousLabel?: string;
    /** Next 버튼 텍스트 */
    nextLabel?: string;
    /** 아이템 범위 포맷 함수 */
    formatItemRange?: (start: number, end: number, total: number) => string;
    /** 페이지당 항목 수 라벨 */
    pageSizeLabel?: string;
    /** 페이지 사이즈 선택자 숨기기 */
    hidePageSizeSelector?: boolean;
    /** 아이템 범위 표시 숨기기 */
    hideItemRange?: boolean;
}
declare const PaginationFooter: React.ForwardRefExoticComponent<PaginationFooterProps & React.RefAttributes<HTMLDivElement>>;
export { PaginationFooter };
