"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 너비 (기본: 100%) */
  width?: string | number
  /** 높이 (기본: 18px) */
  height?: string | number
  /** 원형 여부 */
  circle?: boolean
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean
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
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height = 18, circle = false, disableAnimation = false, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          circle ? "rounded-full" : "rounded",
          className
        )}
        style={{
          width: circle ? (height ?? 18) : (width ?? "100%"),
          height: height ?? 18,
          ...style,
        }}
        {...props}
      >
        {/* Default 상태: 중앙이 어두움 - Light */}
        <div
          className={cn(
            "absolute inset-0 dark:hidden",
            !disableAnimation && "skeleton-default"
          )}
          style={{
            background: "linear-gradient(90deg, #ffffff 0%, #d4dae3 50%, #ffffff 100%)",
          }}
        />
        {/* Default 상태: 중앙이 밝음 - Dark */}
        <div
          className={cn(
            "absolute inset-0 hidden dark:block",
            !disableAnimation && "skeleton-default"
          )}
          style={{
            background: "linear-gradient(90deg, #444b57 0%, #5e6977 50%, #444b57 100%)",
          }}
        />
        {/* Variant3 상태: 중앙이 밝음 - Light */}
        {!disableAnimation && (
          <div
            className="absolute inset-0 skeleton-variant dark:hidden"
            style={{
              background: "linear-gradient(90deg, #d4dae3 0%, #ffffff 50%, #d4dae3 100%)",
            }}
          />
        )}
        {/* Variant3 상태: 중앙이 어두움 - Dark */}
        {!disableAnimation && (
          <div
            className="absolute inset-0 skeleton-variant hidden dark:block"
            style={{
              background: "linear-gradient(90deg, #5e6977 0%, #444b57 50%, #5e6977 100%)",
            }}
          />
        )}
        <style>{`
          .skeleton-variant {
            animation: skeleton-dissolve 4s ease-out infinite;
          }
          @keyframes skeleton-dissolve {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
