import * as React from "react";
export interface CardActionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 옵션 목록 */
    options: string[];
    /** 선택된 값 */
    value?: string;
    /** 값 변경 핸들러 */
    onValueChange?: (value: string) => void;
    /** 기본 선택 값 (비제어 컴포넌트용) */
    defaultValue?: string;
}
declare const CardActionGroup: React.ForwardRefExoticComponent<CardActionGroupProps & React.RefAttributes<HTMLDivElement>>;
export { CardActionGroup };
