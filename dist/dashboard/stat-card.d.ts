import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const statCardVariants: (props?: ({
    variant?: "main" | "small" | "sub" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
    /** 아이콘 (선택) */
    icon?: React.ReactNode;
    /** 라벨 */
    label: string;
    /** 숫자/카운트 */
    count: string;
    /** 뱃지 (sub variant에서 사용) */
    badge?: React.ReactNode;
    /** 테두리 스타일 (흰색 배경 + 테두리) */
    bordered?: boolean;
}
declare const StatCard: React.ForwardRefExoticComponent<StatCardProps & React.RefAttributes<HTMLDivElement>>;
export { StatCard, statCardVariants };
