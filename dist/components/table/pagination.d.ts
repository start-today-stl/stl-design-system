import * as React from "react";
export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 현재 페이지 (1-based) */
    currentPage: number;
    /** 전체 페이지 수 */
    totalPages: number;
    /** 페이지 변경 핸들러 */
    onPageChange?: (page: number) => void;
    /** 표시할 페이지 버튼 수 (기본: 5) */
    siblingCount?: number;
    /** Previous 버튼 텍스트 */
    previousLabel?: string;
    /** Next 버튼 텍스트 */
    nextLabel?: string;
}
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLDivElement>>;
export interface PageSizeSelectorProps {
    /** 현재 페이지 사이즈 */
    pageSize: number;
    /** 페이지 사이즈 옵션들 */
    options?: number[];
    /** 페이지 사이즈 변경 핸들러 */
    onPageSizeChange?: (size: number) => void;
    /** 라벨 텍스트 */
    label?: string;
    /** 추가 className */
    className?: string;
}
declare function PageSizeSelector({ className, pageSize, options, onPageSizeChange, label, }: PageSizeSelectorProps): import("react/jsx-runtime").JSX.Element;
export { Pagination, PageSizeSelector };
