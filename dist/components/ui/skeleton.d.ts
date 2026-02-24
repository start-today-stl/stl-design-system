import * as React from "react";
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 너비 (기본: 100%) */
    width?: string | number;
    /** 높이 (기본: 18px) */
    height?: string | number;
    /** 원형 여부 */
    circle?: boolean;
    /** 애니메이션 비활성화 */
    disableAnimation?: boolean;
}
/**
 * 애니메이션 타이밍:
 * - Smart Animation: Delay 1ms, Duration 2000ms
 * - 총 사이클: 4초 (2초씩 각 방향으로 전환)
 *
 * 그라데이션:
 * - Default: Surface/Overlay → Border/Default → Surface/Overlay (중앙이 어두움)
 * - Variant3: Border/Default → Surface/Overlay → Border/Default (중앙이 밝음)
 */
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
export { Skeleton };
