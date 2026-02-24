import * as React from "react";
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 검색 영역 (Search Input) */
    search?: React.ReactNode;
    /** 중앙 커스텀 영역 */
    center?: React.ReactNode;
    /** 기능 버튼 영역 (아이콘 등) */
    actions?: React.ReactNode;
}
declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>>;
export { Header };
