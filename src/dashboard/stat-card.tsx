import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 기본 스타일 (그라데이션)
const gradientStyles = {
  main: "bg-gradient-to-b from-[#f7f9ff] to-white hover:from-[#f6f7f9] hover:to-[#f6f7f9] active:from-primary-200 active:to-primary-200 dark:from-[#2a3348] dark:to-dark-400 dark:hover:from-dark-300 dark:hover:to-dark-300 dark:active:from-primary-200 dark:active:to-primary-200",
  sub: "bg-gradient-to-b from-[#f7f9ff] to-white hover:from-[#f6f7f9] hover:to-[#f6f7f9] active:from-primary-200 active:to-primary-200 dark:from-[#2a3348] dark:to-dark-400 dark:hover:from-dark-300 dark:hover:to-dark-300 dark:active:from-primary-200 dark:active:to-primary-200",
  small: "bg-[#f7f9ff] hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-[#2a3348] dark:hover:bg-dark-300 dark:active:bg-primary-200",
}

// 테두리 스타일 (흰색 배경 + 테두리)
const borderedStyles = {
  main: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200",
  sub: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200",
  small: "bg-white border border-gray-100 hover:bg-[#f6f7f9] active:bg-primary-200 dark:bg-dark-400 dark:border-dark-300 dark:hover:bg-dark-300 dark:active:bg-primary-200",
}

const statCardVariants = cva(
  "relative cursor-pointer transition-colors group",
  {
    variants: {
      variant: {
        // Main: 세로 레이아웃, 큰 숫자 (86px) - 너비 유연
        main: "h-[160px] rounded-[10px] pt-[10px] px-[10px] pb-[18px]",
        // Sub: 세로 레이아웃, 중간 숫자 (48px) + Badge - 너비 유연
        sub: "h-[160px] rounded-[10px] p-[10px]",
        // Small: 가로 레이아웃, 작은 숫자 (14px) - 너비 유연
        small: "rounded-[6px] pl-[10px] pr-[12px] py-[10px]",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
)

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** 아이콘 (선택) */
  icon?: React.ReactNode
  /** 라벨 */
  label: string
  /** 숫자/카운트 */
  count: string
  /** 뱃지 (sub variant에서 사용) */
  badge?: React.ReactNode
  /** 테두리 스타일 (흰색 배경 + 테두리) */
  bordered?: boolean
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant = "main", icon, label, count, badge, bordered = false, ...props }, ref) => {
    const textColorClass = "text-gray-700 dark:text-gray-100"
    const bgStyle = bordered
      ? borderedStyles[variant || "main"]
      : gradientStyles[variant || "main"]

    // Main variant: 세로 레이아웃, 큰 숫자
    if (variant === "main") {
      return (
        <div
          ref={ref}
          className={cn(statCardVariants({ variant }), bgStyle, className)}
          {...props}
        >
          <div className="flex flex-col h-full justify-between">
            {/* 상단: 아이콘 + 라벨 */}
            <div className="flex items-center gap-0.5">
              {icon && (
                <span className={cn("flex-shrink-0", textColorClass)}>
                  {icon}
                </span>
              )}
              <span className={cn("text-sm tracking-[-0.14px]", textColorClass)}>
                {label}
              </span>
            </div>
            {/* 하단: 큰 숫자 (STL Gothic R 폰트) */}
            <span className={cn("font-heading text-[86px] font-normal tracking-[-2.58px] leading-none", textColorClass)}>
              {count}
            </span>
          </div>
        </div>
      )
    }

    // Sub variant: 세로 레이아웃, 중간 숫자 + 뱃지
    if (variant === "sub") {
      return (
        <div
          ref={ref}
          className={cn(statCardVariants({ variant }), bgStyle, className)}
          {...props}
        >
          <div className="flex gap-0.5 h-full">
            {/* 좌측: 라벨 + 숫자 */}
            <div className="flex-1 flex flex-col justify-between">
              {/* 상단: 아이콘 + 라벨 */}
              <div className="flex items-center gap-0.5">
                {icon && (
                  <span className={cn("flex-shrink-0", textColorClass)}>
                    {icon}
                  </span>
                )}
                <span className={cn("text-sm tracking-[-0.14px]", textColorClass)}>
                  {label}
                </span>
              </div>
              {/* 하단: 숫자 */}
              <span className={cn("text-[48px] font-normal tracking-[-1.44px] leading-none", textColorClass)}>
                {count}
              </span>
            </div>
            {/* 우측: 뱃지 (하단 정렬) */}
            {badge && (
              <div className="w-[28px] flex flex-col justify-end items-center">
                {badge}
              </div>
            )}
          </div>
        </div>
      )
    }

    // Small variant: 가로 레이아웃
    return (
      <div
        ref={ref}
        className={cn(statCardVariants({ variant }), bgStyle, className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          {/* 좌측: 아이콘 + 라벨 */}
          <div className="flex items-center gap-0.5">
            {icon && (
              <span className={cn("flex-shrink-0", textColorClass)}>
                {icon}
              </span>
            )}
            <span className={cn("text-sm tracking-[-0.14px]", textColorClass)}>
              {label}
            </span>
          </div>
          {/* 우측: 숫자 */}
          <span className={cn("text-sm tracking-[-0.14px]", textColorClass)}>
            {count}
          </span>
        </div>
      </div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard, statCardVariants }
