import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { LeftIcon, RightIcon } from "@/icons"

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 현재 페이지 (1-based) */
  currentPage: number
  /** 전체 페이지 수 */
  totalPages: number
  /** 페이지 변경 핸들러 */
  onPageChange?: (page: number) => void
  /** 표시할 페이지 버튼 수 (기본: 5) */
  siblingCount?: number
  /** Previous 버튼 텍스트 */
  previousLabel?: string
  /** Next 버튼 텍스트 */
  nextLabel?: string
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "ellipsis")[] {
  const totalNumbers = siblingCount * 2 + 3 // siblings + current + first + last
  const totalButtons = totalNumbers + 2 // + 2 ellipsis

  if (totalPages <= totalButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, "ellipsis", totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    )
    return [1, "ellipsis", ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  )
  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages]
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      previousLabel = "Previous",
      nextLabel = "Next",
      ...props
    },
    ref
  ) => {
    const pages = getPageNumbers(currentPage, totalPages, siblingCount)

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange?.(page)
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {/* Previous 버튼 */}
        <Button
          variant="ghost"
          size="default"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="이전 페이지"
        >
          <LeftIcon size={20} />
          {previousLabel}
        </Button>

        {/* 페이지 번호들 */}
        <div className="flex items-center gap-1">
          {pages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm text-slate-400"
                >
                  ...
                </span>
              )
            }

            const isActive = page === currentPage

            return (
              <Button
                key={page}
                variant="text"
                size="default"
                onClick={() => handlePageChange(page)}
                className={cn(
                  "min-w-[36px]",
                  isActive && "font-semibold text-slate-900 dark:text-white"
                )}
                aria-label={`페이지 ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </Button>
            )
          })}
        </div>

        {/* Next 버튼 */}
        <Button
          variant="ghost"
          size="default"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="다음 페이지"
        >
          {nextLabel}
          <RightIcon size={20} />
        </Button>
      </div>
    )
  }
)
Pagination.displayName = "Pagination"

export interface PageSizeSelectorProps {
  /** 현재 페이지 사이즈 */
  pageSize: number
  /** 페이지 사이즈 옵션들 */
  options?: number[]
  /** 페이지 사이즈 변경 핸들러 */
  onPageSizeChange?: (size: number) => void
  /** 라벨 텍스트 */
  label?: string
  /** 추가 className */
  className?: string
}

function PageSizeSelector({
  className,
  pageSize,
  options = [10, 20, 50, 100],
  onPageSizeChange,
  label = "페이지당 항목 수",
}: PageSizeSelectorProps) {
  const selectOptions = options.map((option) => ({
    label: String(option),
    value: String(option),
  }))

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <span className="text-xs text-slate-500 dark:text-slate-300 whitespace-nowrap">
          {label}
        </span>
      )}
      <Select
        value={String(pageSize)}
        onValueChange={(value) => onPageSizeChange?.(Number(value))}
        options={selectOptions}
        size="sm"
        className="!w-[70px]"
        aria-label="페이지당 항목 수"
      />
    </div>
  )
}

export { Pagination, PageSizeSelector }
