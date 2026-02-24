import * as React from "react";
export interface SplashScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 로고 크기 (기본: 90x76) */
    size?: "default" | "sm" | "lg";
}
/**
 * 애니메이션 타이밍 (총 2.5초 사이클):
 * - Default → Variant2: 500ms (ease-out)
 * - Variant2 → Variant3: 500ms (ease-out)
 * - Variant3 대기: 500ms
 * - Variant3 → Default: 1000ms (ease-out)
 *
 * keyTimes 계산 (2500ms 기준):
 * - 0%: Default (회색)
 * - 20% (500ms): Variant2 (그라데이션)
 * - 40% (1000ms): Variant3 (파란색)
 * - 60% (1500ms): Variant3 유지 (500ms 대기)
 * - 100% (2500ms): Default (1000ms 전환)
 */
declare const SplashScreen: React.ForwardRefExoticComponent<SplashScreenProps & React.RefAttributes<HTMLDivElement>>;
export { SplashScreen };
