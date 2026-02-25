import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 기본 스타일 (그라데이션)
const gradientStyles = {
  main: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  sub: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  small: "bg-blue-50 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-blue-800",
}

// 테두리 스타일 (흰색 배경 + 테두리)
const borderedStyles = {
  main: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  sub: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  small: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
}

const statCardVariants = cva(
  "relative cursor-pointer transition-colors group",
  {
    variants: {
      variant: {
        // Main: 세로 레이아웃, 큰 숫자 (86px) - 너비 유연
        main: "min-h-[160px] rounded-[10px] pt-[10px] px-[10px] pb-[18px]",
        // Sub: 세로 레이아웃, 중간 숫자 (48px) + Badge - 너비 유연
        sub: "min-h-[160px] rounded-[10px] p-[10px]",
        // Small: 가로 레이아웃, 작은 숫자 (14px) - 너비 유연
        small: "rounded-[6px] pl-[10px] pr-[12px] py-[10px]",
      },
      stretch: {
        true: "h-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "main",
      stretch: false,
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
  /** 헤더 우측 액션 영역 (CardActionGroup 등, main variant에서 사용) */
  headerAction?: React.ReactNode
  /** 컨테이너 높이에 맞춤 (h-full) */
  stretch?: boolean
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant = "main", icon, label, count, badge, bordered = false, headerAction, stretch = false, ...props }, ref) => {
    const textColorClass = "text-slate-700 dark:text-slate-100"
    const bgStyle = bordered
      ? borderedStyles[variant || "main"]
      : gradientStyles[variant || "main"]

    // Main variant: 세로 레이아웃, 큰 숫자
    if (variant === "main") {
      return (
        <div
          ref={ref}
          className={cn(statCardVariants({ variant, stretch }), bgStyle, className)}
          {...props}
        >
          <div className="flex flex-col h-full justify-between">
            {/* 상단: 아이콘 + 라벨 + 헤더 액션 */}
            <div className="flex items-center justify-between">
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
              {headerAction && (
                <div className="flex items-center">
                  {headerAction}
                </div>
              )}
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
          className={cn(statCardVariants({ variant, stretch }), bgStyle, className)}
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
        className={cn(statCardVariants({ variant, stretch }), bgStyle, className)}
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
