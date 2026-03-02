import * as React from "react";
/** Textarea 컴포넌트 Props */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** 라벨 텍스트 */
    label?: string;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 라벨이 없어도 라벨 공간 유지 */
    reserveLabelSpace?: boolean;
    /** 필수 입력 표시 (라벨 앞에 점 표시) */
    required?: boolean;
    /** 테이블 모드 (파란 glow 대신 border 강조, wrapper 최소화) */
    tableMode?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
/**
 * @deprecated Textarea를 사용하세요 (동일한 기능)
 */
declare const TextareaField: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea, TextareaField };
