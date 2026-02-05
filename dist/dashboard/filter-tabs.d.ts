import * as React from "react";
export interface FilterTabsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 탭 옵션 목록 */
    options: string[];
    /** 선택된 값 */
    value?: string;
    /** 값 변경 핸들러 */
    onValueChange?: (value: string) => void;
    /** 기본 선택 값 (비제어 컴포넌트용) */
    defaultValue?: string;
}
declare const FilterTabs: React.ForwardRefExoticComponent<FilterTabsProps & React.RefAttributes<HTMLDivElement>>;
export { FilterTabs };
