import { NavigationConfig } from '../config/navigation';
export interface NavRendererProps {
    /** 네비게이션 설정 데이터 */
    items: NavigationConfig;
    /** 아이콘 크기 */
    iconSize?: number;
    /** indicator 아이콘 크기 */
    indicatorSize?: number;
    /** 축소 모드 (아이콘만 표시) */
    collapsed?: boolean;
}
/** 네비게이션 설정 데이터를 컴포넌트로 렌더링 */
export declare function NavRenderer({ items, iconSize, indicatorSize, collapsed, }: NavRendererProps): import("react/jsx-runtime").JSX.Element;
