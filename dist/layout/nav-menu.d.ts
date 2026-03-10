import * as React from "react";
export type NavMenuLayout = "vertical" | "horizontal";
export interface NavMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 레이아웃: vertical(사이드바용) | horizontal(헤더용) */
    layout?: NavMenuLayout;
    /** 축소 모드 (vertical에서만 동작) */
    collapsed?: boolean;
    /** 토글 버튼 표시 여부 (vertical에서만 동작) */
    showToggle?: boolean;
    /** 토글 버튼 클릭 핸들러 */
    onToggle?: () => void;
    /** 스크롤 가능 여부 (내부 콘텐츠에 적용) */
    scrollable?: boolean;
}
declare const NavMenu: React.ForwardRefExoticComponent<NavMenuProps & React.RefAttributes<HTMLDivElement>>;
export { NavMenu };
