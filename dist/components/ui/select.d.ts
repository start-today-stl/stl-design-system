import { inputSizeStyles, InputSize } from './input';
import * as React from "react";
/** @deprecated Use InputSize instead */
export type SelectSize = InputSize;
export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
interface SelectBaseProps {
    /** 라벨 텍스트 */
    label?: string;
    /** 플레이스홀더 */
    placeholder?: string;
    /** 옵션 목록 */
    options: SelectOption[];
    /** 너비 크기 */
    size?: SelectSize;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 비활성화 */
    disabled?: boolean;
    /** 추가 className */
    className?: string;
    /** 접근성 라벨 (label이 없을 때 사용) */
    "aria-label"?: string;
    /** 테이블 모드 (파란 glow 대신 border 강조) */
    tableMode?: boolean;
    /** 라벨이 없어도 라벨 공간 유지 */
    reserveLabelSpace?: boolean;
    /** 필수 입력 표시 (라벨 앞에 점 표시) */
    required?: boolean;
    /** 검색 기능 활성화 */
    searchable?: boolean;
    /** 검색 플레이스홀더 */
    searchPlaceholder?: string;
}
interface SingleSelectProps extends SelectBaseProps {
    /** 다중 선택 모드 */
    multiple?: false;
    /** 선택된 값 */
    value?: string;
    /** 기본 선택 값 */
    defaultValue?: string;
    /** 값 변경 핸들러 */
    onValueChange?: (value: string) => void;
}
interface MultipleSelectProps extends SelectBaseProps {
    /** 다중 선택 모드 */
    multiple: true;
    /** 선택된 값 배열 */
    value?: string[];
    /** 기본 선택 값 배열 */
    defaultValue?: string[];
    /** 값 변경 핸들러 */
    onValueChange?: (value: string[]) => void;
}
export type SelectProps = SingleSelectProps | MultipleSelectProps;
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLButtonElement>>;
export { Select, inputSizeStyles };
