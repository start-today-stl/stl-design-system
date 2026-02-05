import { NavInfoItemProps } from './nav-info';
import * as React from "react";
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 축소 상태 (외부에서 제어할 때 사용) */
    collapsed?: boolean;
    /** 기본 축소 상태 */
    defaultCollapsed?: boolean;
    /** 축소 상태 변경 핸들러 */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** 토글 버튼 표시 여부 */
    showToggle?: boolean;
    /** 공지 제목 */
    noticeTitle?: string;
    /** 공지 내용 */
    noticeDescription?: string;
    /** 공지 아이콘 */
    noticeIcon?: React.ReactNode;
    /** 정보 항목들 */
    infoItems?: NavInfoItemProps[];
}
declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>>;
export { Sidebar };
