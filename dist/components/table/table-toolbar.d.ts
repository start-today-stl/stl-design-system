import * as React from "react";
export interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 전체 아이템 개수 */
    totalCount?: number;
    /** 선택된 아이템 개수 */
    selectedCount?: number;
    /** 전체 개수 포맷 함수 */
    formatTotal?: (count: number) => string;
    /** 선택 개수 포맷 함수 */
    formatSelected?: (count: number) => string;
}
declare const TableToolbar: React.ForwardRefExoticComponent<TableToolbarProps & React.RefAttributes<HTMLDivElement>>;
export { TableToolbar };
