import * as React from "react";
export interface NavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 메뉴 아이콘 */
    icon?: React.ReactNode;
    /** 메뉴 라벨 */
    label: string;
    /** 활성 상태 */
    active?: boolean;
    /** 기본 펼침 상태 */
    defaultExpanded?: boolean;
    /** 펼침 상태 (제어 컴포넌트) */
    expanded?: boolean;
    /** 펼침 상태 변경 핸들러 */
    onExpandedChange?: (expanded: boolean) => void;
    /** 축소 모드 (아이콘만 표시) */
    collapsed?: boolean;
    /** 뎁스 레벨 */
    depth?: 1 | 2 | 3;
    /** @internal 플라이아웃 내부 여부 (collapsed 모드에서 중첩 NavGroup 처리용) */
    _inFlyout?: boolean;
}
declare const NavGroup: React.ForwardRefExoticComponent<NavGroupProps & React.RefAttributes<HTMLDivElement>>;
export { NavGroup };
