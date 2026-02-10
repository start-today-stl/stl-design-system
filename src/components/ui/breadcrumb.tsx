/**
 * Breadcrumb - 페이지 경로/뎁스 표시 컴포넌트
 *
 * @description
 * 현재 페이지의 위치를 계층 구조로 보여주는 네비게이션 컴포넌트입니다.
 * 각 페이지 컴포넌트 상단에서 사용합니다.
 *
 * @example
 * // 기본 사용
 * import { Breadcrumb } from "stl-design-system/components"
 *
 * function OrderListPage() {
 *   return (
 *     <>
 *       <Breadcrumb
 *         items={[
 *           { label: "홈", href: "/" },
 *           { label: "판매 관리", href: "/sales" },
 *           { label: "B2C 주문관리" },  // 마지막은 현재 페이지 (링크 없음)
 *         ]}
 *       />
 *       <PageTitle title="B2C 주문관리" />
 *       {// 페이지 컨텐츠}
 *     </>
 *   )
 * }
 *
 * @example
 * // onClick 핸들러 사용 (SPA 라우팅)
 * <Breadcrumb
 *   items={[
 *     { label: "홈", onClick: () => navigate("/") },
 *     { label: "설정", onClick: () => navigate("/settings") },
 *     { label: "알림 설정" },
 *   ]}
 * />
 */
import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  /** 표시할 텍스트 */
  label: string
  /** 클릭 시 이동할 경로 (없으면 현재 페이지) */
  href?: string
  /** 클릭 핸들러 */
  onClick?: () => void
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb 아이템 목록 */
  items: BreadcrumbItem[]
  /** 구분자 커스터마이징 */
  separator?: React.ReactNode
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm", className)}
        {...props}
      >
        <ol className="flex items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isClickable = !isLast && (item.href || item.onClick)

            return (
              <li key={index} className="flex items-center gap-1">
                {isClickable ? (
                  item.href ? (
                    <a
                      href={item.href}
                      className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                ) : (
                  <span
                    className={cn(
                      isLast
                        ? "text-text-primary font-medium"
                        : "text-text-secondary"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="text-text-disabled" aria-hidden="true">
                    {separator || <ChevronRight className="size-4" />}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
