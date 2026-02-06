import * as React from "react"

import { cn } from "@/lib/utils"
import { LeftIcon, RightIcon } from "@/icons"

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 검색 영역 (Search Input) */
  search?: React.ReactNode
  /** 최근 방문 태그 영역 */
  recentVisits?: React.ReactNode
  /** 기능 버튼 영역 (아이콘 등) */
  actions?: React.ReactNode
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, search, recentVisits, actions, children, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(false)

    const checkScroll = React.useCallback(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }, [])

    React.useEffect(() => {
      checkScroll()
      const container = scrollContainerRef.current
      if (!container) return

      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(container)

      return () => resizeObserver.disconnect()
    }, [checkScroll, recentVisits])

    const scroll = (direction: "left" | "right") => {
      const container = scrollContainerRef.current
      if (!container) return

      const scrollAmount = 100
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4 w-full h-[100px] px-6 pt-8 pb-4",
          "bg-cool-50 dark:bg-dark-600 backdrop-blur-[16px]",
          className
        )}
        {...props}
      >
        {/* 검색 영역 (왼쪽) - 최소 200px, 공간 있으면 늘어남 */}
        <div className="flex-1 min-w-[200px] max-w-[593px]">
          {search || children}
        </div>

        {/* 최근 방문 태그 영역 - 공간 있으면 늘어남 */}
        {recentVisits && (
          <div className="flex items-center gap-1.5 flex-1 min-w-[150px] max-w-[400px]">
            <span className="text-xs text-gray-700 dark:text-gray-300 tracking-[-0.12px] whitespace-nowrap">
              최근 방문
            </span>
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {/* 왼쪽 스크롤 버튼 */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="스크롤 왼쪽"
                >
                  <LeftIcon size={24} />
                </button>
              )}

              {/* 태그 컨테이너 */}
              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0"
              >
                {recentVisits}
              </div>

              {/* 오른쪽 스크롤 버튼 */}
              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="스크롤 오른쪽"
                >
                  <RightIcon size={24} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 기능 버튼 영역 (우측 끝) */}
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {actions}
          </div>
        )}
      </div>
    )
  }
)
Header.displayName = "Header"

export { Header }
