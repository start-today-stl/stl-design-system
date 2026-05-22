/**
 * PageHeader - 페이지 헤더 컴포넌트
 *
 * @description
 * PageTitle과 Tabs를 조합한 페이지 헤더 컴포넌트입니다.
 * 탭이 없는 경우 PageTitle만 표시됩니다.
 * 탭이 많아 영역을 넘으면 좌/우 화살표 버튼으로 가로 스크롤 가능합니다.
 *
 * @example
 * // 탭 없이 사용
 * <PageHeader title="대시보드" subtitle="Dashboard" />
 *
 * @example
 * // 탭과 함께 사용
 * <PageHeader
 *   title="출고 내역"
 *   subtitle="Shipment History"
 *   bookmarked={bookmarked}
 *   onBookmark={() => setBookmarked(!bookmarked)}
 *   tabs={
 *     <Tabs defaultValue="b2c">
 *       <TabsList align="end">
 *         <TabsTrigger value="b2c">B2C 출고</TabsTrigger>
 *         <TabsTrigger value="b2b">B2B 출고</TabsTrigger>
 *       </TabsList>
 *     </Tabs>
 *   }
 * />
 */
import * as React from "react"

import { cn } from "@/lib/utils"
import { LeftIcon } from "@/icons"
import { Button } from "@/components/ui/button"
import { PageTitle, type PageTitleProps } from "./page-title"

export interface PageHeaderProps
  extends Omit<PageTitleProps, "className">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 탭 영역 (Tabs 컴포넌트) */
  tabs?: React.ReactNode
  /** 스크롤 시 상단에 고정 */
  sticky?: boolean
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    { className, title, subtitle, bookmarked, onBookmark, tabs, sticky, ...props },
    ref
  ) => {
    const [isStuck, setIsStuck] = React.useState(false)
    const sentinelRef = React.useRef<HTMLDivElement>(null)

    // 탭 스크롤 컨테이너 + 가로 오버플로우 상태
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(false)

    React.useEffect(() => {
      if (!sticky || !sentinelRef.current) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsStuck(!entry.isIntersecting)
        },
        { threshold: 0 }
      )

      observer.observe(sentinelRef.current)
      return () => observer.disconnect()
    }, [sticky])

    // 탭 가로 스크롤 가능 여부 추적
    React.useEffect(() => {
      const el = scrollRef.current
      if (!el || !tabs) return

      const updateState = () => {
        const { scrollLeft, scrollWidth, clientWidth } = el
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
      }

      updateState()
      el.addEventListener("scroll", updateState)
      const observer = new ResizeObserver(updateState)
      observer.observe(el)
      return () => {
        el.removeEventListener("scroll", updateState)
        observer.disconnect()
      }
    }, [tabs])

    const handleScroll = (direction: "left" | "right") => {
      const el = scrollRef.current
      if (!el) return
      const delta = el.clientWidth * 0.7
      el.scrollBy({ left: direction === "left" ? -delta : delta, behavior: "smooth" })
    }

    return (
      <>
        {sticky && <div ref={sentinelRef} className="h-0" />}
        <div
          ref={ref}
          className={cn(
            "flex items-end w-full",
            sticky && "sticky top-0 z-30 bg-slate-50 dark:bg-slate-950",
            sticky && isStuck && "[box-shadow:0_4px_4px_-4px_rgb(0_0_0/0.15)]",
            className
          )}
          {...props}
        >
          <PageTitle
            title={title}
            subtitle={subtitle}
            bookmarked={bookmarked}
            onBookmark={onBookmark}
            className="flex-shrink-0"
          />
          {tabs && (
            <div className="flex flex-1 min-w-0 ml-2 items-end">
              {/* 좌측 스크롤 버튼 (탭 영역 바깥) */}
              {canScrollLeft && (
                <Button
                  variant="text"
                  size="icon"
                  onClick={() => handleScroll("left")}
                  aria-label="탭 왼쪽으로 스크롤"
                  className="shrink-0"
                >
                  <LeftIcon size={24} />
                </Button>
              )}
              <div
                ref={scrollRef}
                className="flex flex-1 min-w-0 overflow-x-auto scrollbar-hide"
              >
                <div className="shrink-0 ml-auto">{tabs}</div>
              </div>
              {/* 우측 스크롤 버튼 (탭 영역 바깥) */}
              {canScrollRight && (
                <Button
                  variant="text"
                  size="icon"
                  onClick={() => handleScroll("right")}
                  aria-label="탭 오른쪽으로 스크롤"
                  className="shrink-0"
                >
                  <LeftIcon size={24} className="rotate-180" />
                </Button>
              )}
            </div>
          )}
        </div>
      </>
    )
  }
)
PageHeader.displayName = "PageHeader"

export { PageHeader }
