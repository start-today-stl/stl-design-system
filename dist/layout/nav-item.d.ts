import { VariantProps } from 'class-variance-authority';
import { NavMenuLayout } from './nav-menu';
import * as React from "react";
declare const navItemVariants: (props?: ({
    active?: boolean | null | undefined;
    depth?: 1 | 2 | 3 | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface NavItemProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof navItemVariants> {
    /**
     * 링크 주소. 지정하면 `<a>` 로 렌더된다.
     *
     * 앵커여야 Cmd/Ctrl + 클릭(새 탭), 휠 클릭, 우클릭 → "새 탭에서 열기" 가 동작한다.
     * `<button>` + JS 로는 브라우저 기본 동작을 흉내낼 수 없다.
     *
     * SPA 라우터를 쓴다면 클릭 핸들러에서 `preventDefault()` 로 기본 이동을 막아야
     * 전체 페이지 리로드가 나지 않는다. `NavRenderer` 를 쓰면 이 처리가 이미 되어 있다.
     */
    href?: string;
    /** 링크 target (href 지정 시에만 유효) */
    target?: string;
    /** 링크 rel (href 지정 시에만 유효) */
    rel?: string;
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
    /** 레이아웃 (NavMenu에서 전달됨) */
    layout?: NavMenuLayout;
    /** 우측 인디케이터 아이콘 (펼침 모드) */
    indicator?: React.ReactNode;
    /** @internal 플라이아웃 내부 여부 (NavGroup에서 전달됨, DOM에 전달되지 않음) */
    _inFlyout?: boolean;
}
declare const NavItem: React.ForwardRefExoticComponent<NavItemProps & React.RefAttributes<HTMLElement>>;
export { NavItem, navItemVariants };
