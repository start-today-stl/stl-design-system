import { NavigationConfig, NavItemConfig, TopLevelNavItem } from './types';
import { NavMenuLayout } from './nav-menu';
import * as React from "react";
export interface NavRendererProps {
    /** 네비게이션 설정 데이터 */
    items: NavigationConfig;
    /** 아이콘 크기 */
    iconSize?: number;
    /** indicator 아이콘 크기 */
    indicatorSize?: number;
    /** 축소 모드 (아이콘만 표시) */
    collapsed?: boolean;
    /** 현재 경로 (active 상태 자동 결정) */
    currentPath?: string;
    /**
     * 아이템 클릭 핸들러 (href가 있는 아이템 클릭 시 호출).
     *
     * href 가 있는 아이템은 `<a>` 로 렌더되므로 브라우저 기본 이동이 있다.
     * 이 핸들러가 지정되면 **평범한 좌클릭에 한해** 기본 이동을 막고 핸들러만 호출한다
     * (SPA 라우터 이동 + 전체 페이지 리로드가 겹치는 것을 방지).
     *
     * Cmd / Ctrl / Shift / Alt + 클릭과 휠 클릭은 브라우저에 그대로 맡겨서
     * 새 탭 / 새 창 열기가 동작한다. 이때 이 핸들러는 호출되지 않는다.
     *
     * `event` 로 기본 판단을 덮어쓸 수 있다.
     */
    onItemClick?: (href: string, item: NavItemConfig | TopLevelNavItem, event: React.MouseEvent<HTMLElement>) => void;
    /** 레이아웃 (vertical | horizontal) */
    layout?: NavMenuLayout;
}
/** 네비게이션 설정 데이터를 컴포넌트로 렌더링 */
export declare function NavRenderer({ items, iconSize, indicatorSize, collapsed, currentPath, onItemClick, layout, }: NavRendererProps): React.JSX.Element;
