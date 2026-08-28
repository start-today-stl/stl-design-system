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
    /**
     * 내용에 따라 세로가 자동 확장.
     * - 켜면 유저 드래그 리사이즈는 꺼짐 (`resize-none`)
     * - `maxHeight` 지정 시 그 이상은 내부 스크롤
     * - `rows` 로 초기(=최소) 높이 조절 (기본 3)
     */
    autoGrow?: boolean;
    /** autoGrow 최대 높이(px). 없으면 무제한 (뷰포트까지 늘어남) */
    maxHeight?: number;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
/**
 * @deprecated Textarea를 사용하세요 (동일한 기능)
 */
declare const TextareaField: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea, TextareaField };
