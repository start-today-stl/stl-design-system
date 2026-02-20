import { InputSize } from './input';
import * as React from "react";
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 라벨 텍스트 */
    label?: string;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 너비 크기 */
    size?: InputSize;
    /** 라벨이 없어도 라벨 공간 유지 */
    reserveLabelSpace?: boolean;
}
declare const InputGroup: React.ForwardRefExoticComponent<InputGroupProps & React.RefAttributes<HTMLDivElement>>;
export { InputGroup };
