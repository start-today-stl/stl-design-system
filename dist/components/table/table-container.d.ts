import * as React from "react";
export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 자식 요소 (TableToolbar, DataTable, PaginationFooter 등) */
    children: React.ReactNode;
    /** flex 부모의 남은 공간을 채울지 여부 (목록 페이지에서 사용) */
    grow?: boolean;
}
declare const TableContainer: React.ForwardRefExoticComponent<TableContainerProps & React.RefAttributes<HTMLDivElement>>;
export { TableContainer };
