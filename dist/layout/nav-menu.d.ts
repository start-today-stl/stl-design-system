import * as React from "react";
export interface NavMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 축소 모드 */
    collapsed?: boolean;
    /** 토글 버튼 표시 여부 */
    showToggle?: boolean;
    /** 토글 버튼 클릭 핸들러 */
    onToggle?: () => void;
    /** 스크롤 가능 여부 (내부 콘텐츠에 적용) */
    scrollable?: boolean;
}
declare const NavMenu: React.ForwardRefExoticComponent<NavMenuProps & React.RefAttributes<HTMLDivElement>>;
export { NavMenu };
