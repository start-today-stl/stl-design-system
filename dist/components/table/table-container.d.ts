import * as React from "react";
export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 자식 요소 (TableToolbar, DataTable, PaginationFooter 등) */
    children: React.ReactNode;
}
declare const TableContainer: React.ForwardRefExoticComponent<TableContainerProps & React.RefAttributes<HTMLDivElement>>;
export { TableContainer };
