import * as React from "react";
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 검색 영역 (Search Input) */
    search?: React.ReactNode;
    /** 최근 방문 태그 영역 */
    recentVisits?: React.ReactNode;
    /** 기능 버튼 영역 (아이콘 등) */
    actions?: React.ReactNode;
}
declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>>;
export { Header };
