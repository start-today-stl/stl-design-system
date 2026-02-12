import { NavigationConfig, NavItemConfig, TopLevelNavItem } from './types';
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
    /** 아이템 클릭 핸들러 (href가 있는 아이템 클릭 시 호출) */
    onItemClick?: (href: string, item: NavItemConfig | TopLevelNavItem) => void;
}
/** 네비게이션 설정 데이터를 컴포넌트로 렌더링 */
export declare function NavRenderer({ items, iconSize, indicatorSize, collapsed, currentPath, onItemClick, }: NavRendererProps): import("react/jsx-runtime").JSX.Element;
