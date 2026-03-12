import * as React from "react";
export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 로고 (사이드바 없이 헤더에 로고 배치 시) */
    logo?: React.ReactNode;
    /** 왼쪽 메뉴 버튼 (햄버거 아이콘 등) - 사이드바 hidden 모드용 */
    menuButton?: React.ReactNode;
    /** 헤더 네비게이션 (사이드바 없이 헤더에 메뉴 배치 시) */
    nav?: React.ReactNode;
    /** 기능 버튼 영역 (아이콘 등) - 우측 끝 배치 */
    actions?: React.ReactNode;
}
declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>>;
export { Header };
