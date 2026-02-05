import * as React from "react";
export interface DashboardListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 날짜 (좌측) */
    date: string;
    /** 제목 (중앙, 말줄임 처리) */
    title: string;
    /** 추가 정보 (우측, 조회수 등) */
    extra?: string;
}
declare const DashboardListItem: React.ForwardRefExoticComponent<DashboardListItemProps & React.RefAttributes<HTMLDivElement>>;
export { DashboardListItem };
