import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// 기본 스타일 (그라데이션)
// 헤더 액션에 마우스가 올라가 있으면 카드 호버 배경을 원래 색으로 되돌린다.
// (액션도 자체 호버 색을 갖는데 카드까지 같이 반응하면 액션이 배경에 묻힌다)
const actionHoverReset =
  "has-[[data-card-action]:hover]:from-blue-50 has-[[data-card-action]:hover]:to-white dark:has-[[data-card-action]:hover]:from-blue-950 dark:has-[[data-card-action]:hover]:to-slate-800"

const gradientStyles = {
  main: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  sub: "bg-gradient-to-b from-blue-50 to-white hover:from-slate-100 hover:to-slate-100 active:from-blue-200 active:to-blue-200 dark:from-blue-950 dark:to-slate-800 dark:hover:from-slate-700 dark:hover:to-slate-700 dark:active:from-blue-800 dark:active:to-blue-800",
  small: "bg-blue-50 hover:bg-slate-100 active:bg-blue-200 dark:bg-blue-900 dark:hover:bg-slate-700 dark:active:bg-blue-800",
}

// 테두리 스타일 (흰색 배경 + 테두리)
const borderedStyles = {
  main: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  sub: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
  small: "bg-white border border-slate-100 hover:bg-slate-100 active:bg-blue-200 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:active:bg-blue-800",
}

const statCardVariants = cva(
  // overflow-hidden: 긴 count/label 이 카드 경계 밖으로 튀어나오지 않도록 (rounded 와 함께 clip)
  "relative overflow-hidden cursor-pointer transition-colors group flex flex-col",
  {
    variants: {
      variant: {
        // Main: 세로 레이아웃, 큰 숫자 (86px) - 너비 유연
        main: "min-h-[160px] rounded-[10px] pt-[10px] px-[10px] pb-[18px]",
        // Sub: 세로 레이아웃, 중간 숫자 (48px) + Badge - 너비 유연
        sub: "min-h-[160px] rounded-[10px] p-[10px]",
        // Small: 가로 레이아웃, 작은 숫자 (14px) - 너비 유연, 세로 중앙 정렬
        small: "min-h-[44px] rounded-[6px] pl-[10px] pr-[12px] py-[10px] justify-center",
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
  label?: string
  /** 숫자/카운트 */
  count?: string
  /** 뱃지 (sub variant에서 사용) */
  badge?: React.ReactNode
  /** 테두리 스타일 (흰색 배경 + 테두리) */
  bordered?: boolean
  /** 헤더 우측 액션 영역 (CardActionGroup 등, main variant에서 사용) */
  headerAction?: React.ReactNode
  /** 컨테이너 높이에 맞춤 (h-full) */
  stretch?: boolean
  /** 로딩 상태 (스켈레톤 표시) */
  loading?: boolean
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant = "main", icon, label, count, badge, bordered = false, headerAction, stretch = false, loading = false, ...props }, ref) => {
    const textColorClass = "text-slate-700 dark:text-slate-100"
    const bgStyle = bordered
      ? borderedStyles[variant || "main"]
      : gradientStyles[variant || "main"]

    // Main variant: 세로 레이아웃, 큰 숫자
    if (variant === "main") {
      return (
        <div
          ref={ref}
          className={cn(
            statCardVariants({ variant, stretch }),
            bgStyle,
            headerAction && actionHoverReset,
            className,
          )}
          {...props}
        >
          {loading ? (
            <div className="flex flex-col flex-1 justify-between">
              <Skeleton width={60} height={14} />
              <Skeleton width="70%" height={64} />
            </div>
          ) : (
            <div className="flex flex-col flex-1 justify-between">
              {/* 상단: 아이콘 + 라벨 + 헤더 액션 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {icon && (
                    <span className={cn("flex-shrink-0", textColorClass)}>
                      {icon}
                    </span>
                  )}
                  <span className={cn("text-xl tracking-[-0.2px]", textColorClass)}>
                    {label}
                  </span>
                </div>
                {headerAction && (
                  // 카드 전체가 클릭 영역이라, 액션 클릭이 카드 onClick 으로
                  // 번지지 않게 슬롯에서 막는다 (쓰는 쪽에서 매번 감싸지 않도록)
                  <div
                    data-card-action=""
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {headerAction}
                  </div>
                )}
              </div>
              {/* 하단: 큰 숫자 — 우측정렬. font-heading (STL Gothic R) 로 브랜드 톤 적용.
                  카드 폭보다 긴 숫자면 잘리는 대신 말줄임(…) 표시 */}
              <span className={cn("text-[86px] font-heading font-normal tracking-[-2.58px] leading-none block max-w-full truncate text-right", textColorClass)}>
                {count}
              </span>
            </div>
          )}
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
          {loading ? (
            <div className="flex flex-col flex-1 justify-between">
              <Skeleton width={50} height={14} />
              <Skeleton width="50%" height={36} />
            </div>
          ) : (
            <div className="flex flex-col flex-1 justify-between">
              {/* 상단: 아이콘 + 라벨 */}
              <div className="flex items-center gap-0.5">
                {icon && (
                  <span className={cn("flex-shrink-0", textColorClass)}>
                    {icon}
                  </span>
                )}
                <span className={cn("text-xl tracking-[-0.2px]", textColorClass)}>
                  {label}
                </span>
              </div>
              {/* 하단: 좌측 뱃지 + 우측 숫자 (우측정렬).
                  뱃지 폭이 유동적이라도 숫자가 우측 끝에 붙도록 flex row 로 배치.
                  긴 숫자면 잘리는 대신 말줄임. */}
              <div className="flex items-end gap-2 min-w-0">
                {badge && (
                  <div className="flex-shrink-0">
                    {badge}
                  </div>
                )}
                <span className={cn("flex-1 text-[48px] font-heading font-normal tracking-[-1.44px] leading-none block min-w-0 truncate text-right", textColorClass)}>
                  {count}
                </span>
              </div>
            </div>
          )}
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
        {loading ? (
          <div className="flex items-center justify-between">
            <Skeleton width={60} height={14} />
            <Skeleton width={30} height={14} />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            {/* 좌측: 아이콘 + 라벨 */}
            <div className="flex items-center gap-0.5">
              {icon && (
                <span className={cn("flex-shrink-0", textColorClass)}>
                  {icon}
                </span>
              )}
              <span className={cn("text-base tracking-[-0.16px]", textColorClass)}>
                {label}
              </span>
            </div>
            {/* 우측: 숫자 (긴 숫자면 잘리는 대신 말줄임) — main/sub 와 동일하게 font-heading */}
            <span className={cn("text-base font-heading tracking-[-0.16px] min-w-0 truncate", textColorClass)}>
              {count}
            </span>
          </div>
        )}
      </div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard, statCardVariants }
