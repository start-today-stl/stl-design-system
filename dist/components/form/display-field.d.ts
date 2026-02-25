import * as React from "react";
/** 값 표시 타입 */
export type DisplayFieldType = "text" | "email" | "phone" | "money" | "date";
/** 텍스트 오버플로우 처리 방식 */
export type TextOverflow = "wrap" | "ellipsis" | "truncate";
/** 너비 크기 */
export type DisplayFieldSize = "sm" | "md" | "lg" | "full";
export interface DisplayFieldProps {
    /** 라벨 텍스트 */
    label?: string;
    /** 표시할 값 */
    value?: React.ReactNode;
    /** 값이 비어있을 때 표시할 텍스트 (기본: "-") */
    emptyText?: string;
    /** 너비 크기 */
    size?: DisplayFieldSize;
    /** 값 타입에 따른 자동 포맷팅 */
    type?: DisplayFieldType;
    /** 텍스트 오버플로우 처리 (기본: "wrap") */
    textOverflow?: TextOverflow;
    /** 복사 버튼 표시 */
    copyable?: boolean;
    /** 복사 완료 시 콜백 */
    onCopy?: (value: string) => void;
    /** 필수 필드 표시 (라벨 앞 점) */
    required?: boolean;
    /** 도움말 텍스트 */
    helper?: string;
    /** 추가 className (값 영역) */
    className?: string;
    /** 라벨 className */
    labelClassName?: string;
    /** 라벨이 없어도 라벨 공간 유지 */
    reserveLabelSpace?: boolean;
    /** 커스텀 값 렌더러 (value를 완전히 커스텀) */
    renderValue?: (value: React.ReactNode) => React.ReactNode;
}
/**
 * DisplayField - 상세 화면(View Mode)에서 라벨과 값을 표시하는 컴포넌트
 *
 * @example
 * // 기본 사용
 * <DisplayField label="상품명" value="테스트 상품" />
 *
 * // 타입별 포맷팅
 * <DisplayField label="가격" value={15000} type="money" />
 * <DisplayField label="전화번호" value="01012345678" type="phone" />
 *
 * // 복사 기능
 * <DisplayField label="주문번호" value="ORD-2024-001" copyable />
 *
 * // 빈 값 처리
 * <DisplayField label="메모" value="" emptyText="메모 없음" />
 */
export declare const DisplayField: React.ForwardRefExoticComponent<DisplayFieldProps & React.RefAttributes<HTMLDivElement>>;
