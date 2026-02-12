import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const navItemVariants: (props?: ({
    active?: boolean | null | undefined;
    depth?: 1 | 2 | 3 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof navItemVariants> {
    /** 메뉴 아이콘 */
    icon?: React.ReactNode;
    /** 메뉴 라벨 */
    label: string;
    /** 서브메뉴 존재 여부 */
    hasChildren?: boolean;
    /** 서브메뉴 펼침 상태 */
    expanded?: boolean;
    /** 축소 모드 (아이콘만 표시) */
    collapsed?: boolean;
    /** 우측 인디케이터 아이콘 (펼침 모드) */
    indicator?: React.ReactNode;
    /** @internal 플라이아웃 내부 여부 (NavGroup에서 전달됨, DOM에 전달되지 않음) */
    _inFlyout?: boolean;
}
declare const NavItem: React.ForwardRefExoticComponent<NavItemProps & React.RefAttributes<HTMLButtonElement>>;
export { NavItem, navItemVariants };
