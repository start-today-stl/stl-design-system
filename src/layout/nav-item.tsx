import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RightIcon, DownIcon } from "@/icons"
import type { NavMenuLayout } from "./nav-menu"

const navItemVariants = cva(
  // 기본: h-9(36px), p-1.5(6px), gap-0.5(2px), rounded-md(6px)
  // 색상: slate-600 → hover:blue-500, bg:transparent → hover:slate-50 → active:blue-100
  // no-underline: href 지정 시 <a> 로 렌더되므로 앵커 기본 밑줄 제거
  "flex items-center gap-0.5 w-full h-9 p-1.5 rounded-md cursor-pointer transition-colors no-underline text-sm font-medium tracking-[-0.14px] hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-blue-100 dark:active:bg-blue-100 hover:text-blue-500 dark:hover:text-blue-300 active:text-blue-500 dark:active:text-blue-300 hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300 active:[&_svg]:text-blue-500 dark:active:[&_svg]:text-blue-300",
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
        className: "text-slate-900 dark:text-slate-200 [&_svg]:text-slate-900 [&_svg]:dark:text-slate-200",
      },
      {
        active: false,
        depth: 2,
        className: "text-slate-700 dark:text-slate-300 [&_svg]:text-slate-700 [&_svg]:dark:text-slate-300",
      },
      {
        active: false,
        depth: 3,
        className: "text-slate-700 dark:text-slate-300 [&_svg]:text-slate-700 [&_svg]:dark:text-slate-300",
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
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navItemVariants> {
  /**
   * 링크 주소. 지정하면 `<a>` 로 렌더된다.
   *
   * 앵커여야 Cmd/Ctrl + 클릭(새 탭), 휠 클릭, 우클릭 → "새 탭에서 열기" 가 동작한다.
   * `<button>` + JS 로는 브라우저 기본 동작을 흉내낼 수 없다.
   *
   * SPA 라우터를 쓴다면 클릭 핸들러에서 `preventDefault()` 로 기본 이동을 막아야
   * 전체 페이지 리로드가 나지 않는다. `NavRenderer` 를 쓰면 이 처리가 이미 되어 있다.
   */
  href?: string
  /** 링크 target (href 지정 시에만 유효) */
  target?: string
  /** 링크 rel (href 지정 시에만 유효) */
  rel?: string
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
  /** 레이아웃 (NavMenu에서 전달됨) */
  layout?: NavMenuLayout
  /** 우측 인디케이터 아이콘 (펼침 모드) */
  indicator?: React.ReactNode
  /** @internal 플라이아웃 내부 여부 (NavGroup에서 전달됨, DOM에 전달되지 않음) */
  _inFlyout?: boolean
}

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(
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
      layout = "vertical",
      indicator,
      href,
      target,
      rel,
      _inFlyout,
      ...props
    },
    ref
  ) => {
    // _inFlyout은 NavGroup에서 전달되지만 DOM에는 전달하지 않음
    void _inFlyout

    // 레이아웃별로 "클래스 + 내용" 만 만들고, 태그(a/button) 분기는 아래에서 한 번만 한다.
    // (레이아웃 3종 × 태그 2종 = 6분기가 되는 것을 피하기 위함)
    let shellClassName: string
    let content: React.ReactNode

    if (layout === "horizontal") {
      // Horizontal 레이아웃: 가로 배치
      shellClassName = cn(
        "flex items-center gap-1.5 h-9 px-1.5 rounded-md cursor-pointer transition-colors no-underline",
        "text-sm font-medium tracking-[-0.14px]",
        "hover:bg-slate-50 dark:hover:bg-slate-800",
        "hover:text-blue-500 dark:hover:text-blue-300",
        "hover:[&_svg]:text-blue-500 dark:hover:[&_svg]:text-blue-300",
        active
          ? "text-blue-500 dark:text-blue-300 [&_svg]:text-blue-500 [&_svg]:dark:text-blue-300"
          : "text-slate-900 dark:text-slate-200 [&_svg]:text-slate-900 [&_svg]:dark:text-slate-200",
        className
      )
      content = (
        <>
          {/* 아이콘 */}
          {icon && (
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              {icon}
            </span>
          )}

          {/* 라벨 */}
          <span className="whitespace-nowrap">{label}</span>

          {/* 드롭다운 화살표 (서브메뉴 있을 때) */}
          {hasChildren && (
            <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
              <DownIcon size={16} />
            </span>
          )}
        </>
      )
    } else if (collapsed) {
      // 축소 모드: 아이콘 + 아래에 라벨 표시 (세로 배치)
      shellClassName = cn(
        navItemVariants({ active, depth }),
        "flex-col justify-center items-center w-full h-auto py-2 px-1 gap-1",
        className
      )
      content = (
        <>
          {icon && (
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {icon}
            </span>
          )}
          <span className="text-[10px] font-medium leading-tight text-center truncate w-full px-1">
            {label}
          </span>
        </>
      )
    } else {
      shellClassName = cn(navItemVariants({ active, depth }), className)
      content = (
        <>
          {/* 아이콘 */}
          {icon && (
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {icon}
            </span>
          )}

          {/* 라벨 */}
          <span className="flex-1 text-left truncate">{label}</span>

          {/* 인디케이터 아이콘 (홈 메뉴 등에 사용) */}
          {indicator && !hasChildren && (
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {indicator}
            </span>
          )}

          {/* 화살표 (서브메뉴 있을 때) */}
          {hasChildren && (
            <span
              className={cn(
                "flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform",
                expanded && "rotate-90"
              )}
            >
              <RightIcon size={24} />
            </span>
          )}
        </>
      )
    }

    // href 가 있으면 진짜 앵커로 렌더한다. 그래야 Cmd/Ctrl + 클릭(새 탭), 휠 클릭,
    // 우클릭 → "새 탭에서 열기" 같은 브라우저 기본 동작이 그대로 동작한다.
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={shellClassName}
          {...props}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={shellClassName}
        {...props}
      >
        {content}
      </button>
    )
  }
)
NavItem.displayName = "NavItem"

export { NavItem, navItemVariants }
