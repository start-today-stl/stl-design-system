"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SplashScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 로고 크기 (기본: 90x76) */
  size?: "default" | "sm" | "lg"
}

const sizeMap = {
  sm: { width: 45, height: 38 },
  default: { width: 90, height: 76 },
  lg: { width: 180, height: 152 },
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
const SplashScreen = React.forwardRef<HTMLDivElement, SplashScreenProps>(
  ({ className, size = "default", ...props }, ref) => {
    const gradientId = React.useId()
    const { width, height } = sizeMap[size]

    // 총 애니메이션 시간: 2500ms
    const totalDuration = "2.5s"
    // keyTimes: 0, 0.2, 0.4, 0.6, 1
    const keyTimes = "0; 0.2; 0.4; 0.6; 1"
    // keySplines: ease-out = cubic-bezier(0, 0, 0.58, 1), linear for hold
    const keySplines = "0 0 0.58 1; 0 0 0.58 1; 0 0 1 1; 0 0 0.58 1"

    const darkGradientId = `${gradientId}-dark`

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {/* Light mode */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 90 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="splash-logo dark:hidden"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="117.5"
              y1="3.5"
              x2="45"
              y2="76"
              gradientUnits="userSpaceOnUse"
            >
              {/* 그라데이션 시작점 (상단) */}
              <stop offset="0%">
                <animate
                  attributeName="stop-color"
                  values="#F4F6F8; #D1E4FF; #D1E4FF; #D1E4FF; #F4F6F8"
                  keyTimes={keyTimes}
                  keySplines={keySplines}
                  calcMode="spline"
                  dur={totalDuration}
                  repeatCount="indefinite"
                />
              </stop>
              {/* 그라데이션 중간점 */}
              <stop offset="40.87%">
                <animate
                  attributeName="stop-color"
                  values="#F4F6F8; #D1E4FF; #D1E4FF; #D1E4FF; #F4F6F8"
                  keyTimes={keyTimes}
                  keySplines={keySplines}
                  calcMode="spline"
                  dur={totalDuration}
                  repeatCount="indefinite"
                />
              </stop>
              {/* 그라데이션 끝점 (하단) */}
              <stop offset="100%">
                <animate
                  attributeName="stop-color"
                  values="#F4F6F8; #F4F6F8; #D1E4FF; #D1E4FF; #F4F6F8"
                  keyTimes={keyTimes}
                  keySplines={keySplines}
                  calcMode="spline"
                  dur={totalDuration}
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path
            d="M90 0L14.0448 76L35.1644 19.1365L0 0H90Z"
            fill={`url(#${gradientId})`}
          />
        </svg>
        {/* Dark mode */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 90 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="splash-logo hidden dark:block"
        >
          <defs>
            <linearGradient
              id={darkGradientId}
              x1="117.5"
              y1="3.5"
              x2="45"
              y2="76"
              gradientUnits="userSpaceOnUse"
            >
              {/* 그라데이션 시작점 (상단) - Dark */}
              <stop offset="0%">
                <animate
                  attributeName="stop-color"
                  values="#5e6977; #4591ff; #4591ff; #4591ff; #5e6977"
                  keyTimes={keyTimes}
                  keySplines={keySplines}
                  calcMode="spline"
                  dur={totalDuration}
                  repeatCount="indefinite"
                />
              </stop>
              {/* 그라데이션 중간점 - Dark */}
              <stop offset="40.87%">
                <animate
                  attributeName="stop-color"
                  values="#5e6977; #4591ff; #4591ff; #4591ff; #5e6977"
                  keyTimes={keyTimes}
                  keySplines={keySplines}
                  calcMode="spline"
                  dur={totalDuration}
                  repeatCount="indefinite"
                />
              </stop>
              {/* 그라데이션 끝점 (하단) - Dark */}
              <stop offset="100%">
                <animate
                  attributeName="stop-color"
                  values="#5e6977; #5e6977; #4591ff; #4591ff; #5e6977"
                  keyTimes={keyTimes}
                  keySplines={keySplines}
                  calcMode="spline"
                  dur={totalDuration}
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <path
            d="M90 0L14.0448 76L35.1644 19.1365L0 0H90Z"
            fill={`url(#${darkGradientId})`}
          />
        </svg>
        <style>{`
          .splash-logo {
            filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
          }
          .dark .splash-logo {
            filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.3));
          }
        `}</style>
      </div>
    )
  }
)
SplashScreen.displayName = "SplashScreen"

export { SplashScreen }
