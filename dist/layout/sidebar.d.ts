import * as React from "react";
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 로고 영역 커스터마이징 (collapsed 상태를 받아 다른 렌더링 가능) */
    logo?: (collapsed: boolean) => React.ReactNode;
    /** 축소 상태 (외부에서 제어할 때 사용) */
    collapsed?: boolean;
    /** 기본 축소 상태 */
    defaultCollapsed?: boolean;
    /** 축소 상태 변경 핸들러 */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** 토글 버튼 표시 여부 */
    showToggle?: boolean;
    /** 하단 커스텀 콘텐츠 */
    footer?: React.ReactNode;
}
declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>>;
export { Sidebar };
