import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RightIcon } from "@/icons"

const navItemVariants = cva(
  // 기본: h-9(36px), p-1.5(6px), gap-0.5(2px), rounded-md(6px)
  // 색상: slate-600 → hover:blue-500, bg:transparent → hover:slate-50 → active:blue-100
  "flex items-center gap-0.5 w-full h-9 p-1.5 rounded-md cursor-pointer transition-colors text-sm font-medium tracking-[-0.14px] hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-blue-100 dark:active:bg-blue-100 hover:text-blue-500 dark:hover:text-blue-300 active:text-blue-500 dark:active:text-blue-300 hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300 active:[&_svg]:text-blue-500 dark:active:[&_svg]:text-blue-300",
  {
    variants: {
      active: {
        true: "",
        false: "",
      },
      depth: {
        1: "pl-0",
        2: "pl-6",
        3: "pl-12",
      },
    },
    compoundVariants: [
      // active: false + depth 조합 - 기본 텍스트 색상
      {
        active: false,
        depth: 1,
        className: "text-slate-800 dark:text-slate-200 [&_svg]:text-slate-800 [&_svg]:dark:text-slate-200",
      },
      {
        active: false,
        depth: 2,
        className: "text-slate-600 dark:text-slate-300 [&_svg]:text-slate-600 [&_svg]:dark:text-slate-300",
      },
      {
        active: false,
        depth: 3,
        className: "text-slate-600 dark:text-slate-300 [&_svg]:text-slate-600 [&_svg]:dark:text-slate-300",
      },
      // active: true - 모든 depth에서 파란색
      {
        active: true,
        className: "text-blue-500 dark:text-blue-300 [&_svg]:text-blue-500 [&_svg]:dark:text-blue-300",
      },
    ],
    defaultVariants: {
      active: false,
      depth: 1,
    },
  }
)

export interface NavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navItemVariants> {
  /** 메뉴 아이콘 */
  icon?: React.ReactNode
  /** 메뉴 라벨 */
  label: string
  /** 서브메뉴 존재 여부 */
  hasChildren?: boolean
  /** 서브메뉴 펼침 상태 */
  expanded?: boolean
  /** 축소 모드 (아이콘만 표시) */
  collapsed?: boolean
  /** 우측 인디케이터 아이콘 (펼침 모드) */
  indicator?: React.ReactNode
  /** @internal 플라이아웃 내부 여부 (NavGroup에서 전달됨, DOM에 전달되지 않음) */
  _inFlyout?: boolean
}

const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  (
    {
      className,
      icon,
      label,
      active,
      depth,
      hasChildren,
      expanded,
      collapsed,
      indicator,
      _inFlyout,
      ...props
    },
    ref
  ) => {
    // _inFlyout은 NavGroup에서 전달되지만 DOM에는 전달하지 않음
    void _inFlyout
    // 축소 모드 + 하위 메뉴 없는 경우 툴팁 표시
    if (collapsed && !hasChildren) {
      return (
        <div className="relative group">
          <button
            ref={ref}
            className={cn(
              navItemVariants({ active, depth }),
              "justify-center w-9 px-0",
              className
            )}
            aria-label={label}
            {...props}
          >
            {icon && (
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {icon}
              </span>
            )}
          </button>
          {/* 호버 시 툴팁 */}
          <div className={cn(
            "absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 rounded-md whitespace-nowrap",
            "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
            "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
            "transition-all duration-200 z-50",
            "text-sm font-medium text-slate-800 dark:text-slate-200"
          )}>
            {label}
          </div>
        </div>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(
          navItemVariants({ active, depth }),
          collapsed && "justify-center w-9 px-0",
          className
        )}
        title={collapsed ? label : undefined}
        aria-label={collapsed ? label : undefined}
        {...props}
      >
        {/* 아이콘 */}
        {icon && (
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {icon}
          </span>
        )}

        {/* 라벨 (축소 모드에서는 숨김) */}
        {!collapsed && (
          <span className="flex-1 text-left truncate">{label}</span>
        )}

        {/* 인디케이터 아이콘 (홈 메뉴 등에 사용) */}
        {indicator && !collapsed && !hasChildren && (
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            {indicator}
          </span>
        )}

        {/* 화살표 (서브메뉴 있을 때, 축소 모드에서는 숨김) */}
        {hasChildren && !collapsed && (
          <span
            className={cn(
              "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
              expanded && "rotate-90"
            )}
          >
            <RightIcon size={24} />
          </span>
        )}
      </button>
    )
  }
)
NavItem.displayName = "NavItem"

export { NavItem, navItemVariants }
