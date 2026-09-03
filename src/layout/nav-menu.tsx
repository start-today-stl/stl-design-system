import * as React from "react"

import { cn } from "@/lib/utils"
import { LeftIcon, RightIcon } from "@/icons"

export type NavMenuLayout = "vertical" | "horizontal"

export interface NavMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 레이아웃: vertical(사이드바용) | horizontal(헤더용) */
  layout?: NavMenuLayout
  /** 축소 모드 (vertical에서만 동작) */
  collapsed?: boolean
  /** 토글 버튼 표시 여부 (vertical에서만 동작) */
  showToggle?: boolean
  /** 토글 버튼 클릭 핸들러 */
  onToggle?: () => void
  /** 스크롤 가능 여부 (내부 콘텐츠에 적용) */
  scrollable?: boolean
}

const NavMenu = React.forwardRef<HTMLDivElement, NavMenuProps>(
  ({ className, layout = "vertical", collapsed, showToggle = false, scrollable = false, onToggle, children, ...props }, ref) => {
    // Horizontal 레이아웃
    if (layout === "horizontal") {
      return (
        <nav
          ref={ref}
          className={cn(
            "flex items-center gap-1",
            className
          )}
          {...props}
        >
          {/* children에 layout prop 전달 */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<{ layout?: NavMenuLayout }>, {
                layout,
              })
            }
            return child
          })}
        </nav>
      )
    }

    // Vertical 레이아웃 (기존)
    return (
      <nav
        ref={ref}
        className={cn(
          "relative flex flex-col min-h-0 transition-all duration-300",
          collapsed ? "w-[88px] items-center" : "w-full",
          className
        )}
        {...props}
      >
        {/* 토글 버튼 - 사이드바 우측 가장자리에 배치 */}
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "absolute flex items-center justify-center z-20",
              "w-8 h-8 rounded-[20px] border border-slate-100 dark:border-slate-700",
              "bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-800",
              "transition-all duration-300 cursor-pointer",
              // 사이드바 가로 패딩이 스크롤 영역 안쪽으로 옮겨져서 nav 가 사이드바 전체 폭을
              // 쓰므로, 접힘/펼침 모두 동일한 offset 으로 사이드바 경계에 걸친다.
              // top: 버튼 중심을 로고/헤더 하단 보더(y=64px) 위에 정렬 (nav-menu 시작 y=80 기준 -32).
              "top-[-32px] -right-4"
            )}
            aria-label={collapsed ? "메뉴 펼치기" : "메뉴 접기"}
          >
            {/* 방향성 있는 chevron — 접힘 상태면 "펼치기" 의미로 오른쪽, 펼침 상태면 왼쪽 */}
            {collapsed ? (
              <RightIcon size={24} className="text-slate-500" />
            ) : (
              <LeftIcon size={24} className="text-slate-500" />
            )}
          </button>
        )}

        {/* 메뉴 영역 - 스크롤은 이 내부 div에만 적용.
            가로 여백을 여기서 주는 이유: 스크롤바는 스크롤 컨테이너의 **테두리**에 그려지므로,
            컨테이너가 사이드바 전체 폭을 쓰고 안쪽 padding 으로 내용을 들여쓰면 스크롤바가
            사이드바 우측 끝에 붙는다. (바깥 껍데기에 padding 을 주면 그 폭만큼 스크롤바가
            안쪽으로 떠서 경계가 불분명해짐) */}
        <div
          className={cn(
            "flex flex-col",
            collapsed ? "items-center gap-0.5 w-full px-2 overflow-visible" : "gap-0.5 px-6 pb-4",
            scrollable && !collapsed && "sidebar-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
          )}
        >
          {/* children에 collapsed prop 전달 (React 컴포넌트에만) */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && typeof child.type !== 'string') {
              return React.cloneElement(child as React.ReactElement<{ collapsed?: boolean; layout?: NavMenuLayout }>, {
                collapsed,
                layout,
              })
            }
            return child
          })}
        </div>
      </nav>
    )
  }
)
NavMenu.displayName = "NavMenu"

export { NavMenu }
