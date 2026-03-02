import { VariantProps } from 'class-variance-authority';
import * as React from "react";
/** Step 상태 */
export type StepStatus = "completed" | "active" | "pending";
/** Step 아이템 타입 */
export interface StepItem {
    /** 라벨 텍스트 */
    label: string;
    /** 아이콘 (선택사항) */
    icon?: React.ReactNode;
    /** 상태 (자동 계산 가능) */
    status?: StepStatus;
}
/** Step 원형 아이콘 variants */
declare const stepCircleVariants: (props?: ({
    status?: "active" | "completed" | "pending" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
/** Step 라벨 variants */
declare const stepLabelVariants: (props?: ({
    status?: "active" | "completed" | "pending" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
/** 연결 라인 variants */
declare const stepLineVariants: (props?: ({
    completed?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stepCircleVariants> {
    /** Step 아이템 목록 */
    steps: StepItem[];
    /** 현재 활성 Step 인덱스 (0부터 시작) */
    currentStep?: number;
    /** 완료된 Step에 체크 아이콘 표시 여부 */
    showCheckOnCompleted?: boolean;
}
export declare function Stepper({ steps, currentStep, showCheckOnCompleted, className, ...props }: StepperProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Stepper {
    var displayName: string;
}
export { stepCircleVariants, stepLabelVariants, stepLineVariants };
