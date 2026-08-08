import * as React from "react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FilterIcon } from "@/icons"
import {
  DefaultDateRangeFilter,
  DefaultMultiSelectFilter,
  DefaultNumberRangeFilter,
  DefaultSelectFilter,
  DefaultTextFilter,
} from "./data-table-v2-default-filters"
import type { DataTableV2Column, FilterConfig } from "./types"

interface DataTableV2FilterCellProps<T> {
  column: DataTableV2Column<T>
  filter: FilterConfig<T>
  value: unknown
  active: boolean
  /**
   * 필터 값 변경 콜백 — parent 의 stable ref (`useCallback` 결과).
   * (인라인 arrow 로 넘기면 매 렌더마다 새 ref → React.memo 실패 → 리렌더)
   * 내부에서 columnKey 와 함께 useCallback 으로 wrap 해 onChange 안정화.
   */
  onChange: (columnKey: string, value: unknown) => void
  /** 이 셀이 담당하는 컬럼 키 — onChange 에 전달 */
  columnKey: string
}

/**
 * 헤더 셀 내 필터 아이콘 + 팝오버 렌더러.
 * filter.type 에 따라 프리셋 필터 컴포넌트 자동 선택. `type: "custom"` 이면 사용처 component 를 렌더.
 * 활성 필터(active) 있을 때 아이콘에 도트 인디케이터 표시.
 */
function DataTableV2FilterCellInner<T>({
  column,
  filter,
  value,
  active,
  onChange,
  columnKey,
}: DataTableV2FilterCellProps<T>) {
  // (columnKey, value) 로 wrap → parent 는 stable onChange 만 넘기면 됨. 인라인 arrow 사용 X.
  const handleChange = React.useCallback(
    (v: unknown) => onChange(columnKey, v),
    [onChange, columnKey]
  )
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
            "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
            "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
            active && "text-blue-600 dark:text-blue-400"
          )}
          aria-label={`${typeof column.header === "string" ? column.header : "컬럼"} 필터`}
          onClick={(e) => e.stopPropagation()}
        >
          <FilterIcon size={20} />
          {active && (
            <span
              aria-hidden
              // 필터 활성 여부를 테스트에서 클래스명 대신 이 속성으로 확인한다
              // (Tailwind 클래스는 스타일 조정 시 바뀌므로 검증 기준으로 부적합)
              data-filter-active=""
              className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-3">
        {renderFilterContent(filter, value, handleChange, close, column)}
      </PopoverContent>
    </Popover>
  )
}

// 제네릭 컴포넌트를 memo 로 감싸며 제네릭 유지
export const DataTableV2FilterCell = React.memo(
  DataTableV2FilterCellInner
) as typeof DataTableV2FilterCellInner

function renderFilterContent<T>(
  filter: FilterConfig<T>,
  value: unknown,
  onChange: (value: unknown) => void,
  onClose: () => void,
  column: DataTableV2Column<T>
): React.ReactNode {
  switch (filter.type) {
    case "text":
      return (
        <DefaultTextFilter
          value={value as string | undefined}
          onChange={(v) => onChange(v)}
          onClose={onClose}
          placeholder={filter.placeholder}
        />
      )
    case "select":
      return (
        <DefaultSelectFilter
          value={value as string | undefined}
          onChange={(v) => onChange(v)}
          onClose={onClose}
          options={filter.options}
          placeholder={filter.placeholder}
        />
      )
    case "multiSelect":
      return (
        <DefaultMultiSelectFilter
          value={value as string[] | undefined}
          onChange={(v) => onChange(v)}
          onClose={onClose}
          options={filter.options}
          placeholder={filter.placeholder}
        />
      )
    case "dateRange":
      return (
        <DefaultDateRangeFilter
          value={value as DateRange | undefined}
          onChange={(v) => onChange(v)}
          onClose={onClose}
        />
      )
    case "numberRange":
      return (
        <DefaultNumberRangeFilter
          value={value as { from?: number; to?: number } | undefined}
          onChange={(v) => onChange(v)}
          onClose={onClose}
        />
      )
    case "custom":
      return filter.component({
        value,
        onChange,
        onClose,
        column,
      })
  }
}
