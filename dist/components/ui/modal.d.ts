import * as React from "react";
export interface ModalProps {
    /** 모달 크기 */
    size?: "s" | "m" | "l" | "xl";
    /** 모달 열림 상태 */
    open?: boolean;
    /** 모달 열림/닫힘 상태 변경 핸들러 */
    onOpenChange?: (open: boolean) => void;
    /** 모달 제목 */
    title?: React.ReactNode;
    /** 모달 설명 */
    description?: React.ReactNode;
    /** 모달 본문 내용 */
    children?: React.ReactNode;
    /** 모달 하단 버튼 영역 */
    footer?: React.ReactNode;
    /** 추가 className */
    className?: string;
}
declare const Modal: ({ size, open, onOpenChange, title, description, children, footer, className, }: ModalProps) => import("react/jsx-runtime").JSX.Element;
export { Modal };
