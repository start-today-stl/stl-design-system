import * as React from "react";
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    /** 테이블 최대 높이 (초과 시 세로 스크롤) */
    maxHeight?: number | string;
    /** 스크롤 컨테이너(wrapper) ref */
    wrapperRef?: React.Ref<HTMLDivElement>;
}
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const TableHead: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCell: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;
export type SortDirection = "asc" | "desc" | null;
export interface TableSortableHeadProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "onClick"> {
    /** 현재 정렬 방향 */
    sortDirection?: SortDirection;
    /** 정렬 변경 핸들러 (shiftKey 전달) */
    onSort?: (shiftKey: boolean) => void;
    /** 다중 정렬 시 우선순위 번호 (1부터) */
    sortPriority?: number;
}
declare const TableSortableHead: React.ForwardRefExoticComponent<TableSortableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, TableSortableHead, };
