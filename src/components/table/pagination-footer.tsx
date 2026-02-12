import * as React from "react"

import { cn } from "@/lib/utils"
import { Pagination, PageSizeSelector } from "@/components/table/pagination"

export interface PaginationFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 현재 페이지 (1-based) */
  currentPage: number
  /** 전체 페이지 수 */
  totalPages: number
  /** 페이지 변경 핸들러 */
  onPageChange?: (page: number) => void
  /** 전체 아이템 개수 */
  totalItems?: number
  /** 현재 페이지 사이즈 */
  pageSize?: number
  /** 페이지 사이즈 옵션들 */
  pageSizeOptions?: number[]
  /** 페이지 사이즈 변경 핸들러 */
  onPageSizeChange?: (size: number) => void
  /** Previous 버튼 텍스트 */
  previousLabel?: string
  /** Next 버튼 텍스트 */
  nextLabel?: string
  /** 아이템 범위 포맷 함수 */
  formatItemRange?: (start: number, end: number, total: number) => string
  /** 페이지당 항목 수 라벨 */
  pageSizeLabel?: string
  /** 페이지 사이즈 선택자 숨기기 */
  hidePageSizeSelector?: boolean
  /** 아이템 범위 표시 숨기기 */
  hideItemRange?: boolean
}

const PaginationFooter = React.forwardRef<HTMLDivElement, PaginationFooterProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      totalItems,
      pageSize = 10,
      pageSizeOptions = [10, 20, 50, 100],
      onPageSizeChange,
      previousLabel = "Previous",
      nextLabel = "Next",
      formatItemRange = (start, end, total) =>
        `총 ${total.toLocaleString()}건 중 ${start.toLocaleString()}-${end.toLocaleString()}건 표시`,
      pageSizeLabel = "페이지당 항목 수",
      hidePageSizeSelector = false,
      hideItemRange = false,
      ...props
    },
    ref
  ) => {
    const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0
    const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0
    const showItemRange = !hideItemRange && totalItems !== undefined
    const showPageSizeSelector = !hidePageSizeSelector && onPageSizeChange

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center py-3 px-4",
          "bg-white dark:bg-slate-900",
          "border-t border-slate-200 dark:border-slate-700",
          className
        )}
        {...props}
      >
        {/* 왼쪽: 아이템 범위 표시 */}
        <div className="flex-1">
          {showItemRange && (
            <span className="text-sm text-slate-500 dark:text-slate-300">
              {formatItemRange(startItem, endItem, totalItems)}
            </span>
          )}
        </div>

        {/* 가운데: 페이지네이션 */}
        <div className="flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
          />
        </div>

        {/* 오른쪽: 페이지 사이즈 */}
        <div className="flex-1 flex justify-end">
          {showPageSizeSelector && (
            <PageSizeSelector
              pageSize={pageSize}
              options={pageSizeOptions}
              onPageSizeChange={onPageSizeChange}
              label={pageSizeLabel}
            />
          )}
        </div>
      </div>
    )
  }
)
PaginationFooter.displayName = "PaginationFooter"

export { PaginationFooter }
