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

  // 팝오버가 테이블 밖으로 튀어나가지 않도록 충돌 경계를 테이블로 잡는다.
  // Radix 기본 경계는 뷰포트라, 첫 컬럼 필터가 왼쪽 바깥(사이드바 위)으로 펼쳐져도
  // 화면 안이면 충돌로 보지 않는다.
  //
  // 경계는 **마운트 시점에** ref 로 잡는다. 열린 뒤에 state 로 잡으면 첫 프레임이
  // 뷰포트 기준으로 그려졌다가 다시 배치돼서 위치가 깜빡인다.
  const gridRef = React.useRef<Element | null>(null)
  const setTriggerRef = React.useCallback((el: HTMLButtonElement | null) => {
    triggerElRef.current = el
    gridRef.current = el?.closest('[role="grid"]') ?? null
  }, [])

  // 트리거가 움직이면 닫는다.
  //
  // 팝오버는 트리거(필터 아이콘)에 붙어 있어서, 열어둔 채 가로 스크롤하면
  // 트리거를 따라 움직이다 테이블 밖으로 나간다. 어느 컬럼의 필터였는지도
  // 알 수 없게 되므로 닫는 편이 낫다 (AG Grid 등도 동일).
  //
  // 단 헤더는 sticky 라 **세로 스크롤에는 트리거가 제자리**다. 이때는 팝오버가
  // 어긋나지 않으므로 닫으면 안 된다. 그래서 축을 가정하지 않고 트리거가 실제로
  // 움직였는지를 본다.
  //
  // scroll 은 버블링하지 않아 capture 로 듣는다. 팝오버 안쪽 스크롤
  // (긴 다중선택 목록 등) 은 무시해야 한다.
  const contentRef = React.useRef<HTMLDivElement>(null)
  const triggerElRef = React.useRef<HTMLButtonElement | null>(null)
  React.useEffect(() => {
    if (!open) return
    const start = triggerElRef.current?.getBoundingClientRect()
    if (!start) return
    const onScroll = (e: Event) => {
      const target = e.target as Node | null
      if (target && contentRef.current?.contains(target)) return
      const now = triggerElRef.current?.getBoundingClientRect()
      if (!now) return
      if (Math.abs(now.left - start.left) > 1 || Math.abs(now.top - start.top) > 1) {
        setOpen(false)
      }
    }
    document.addEventListener("scroll", onScroll, true)
    return () => document.removeEventListener("scroll", onScroll, true)
  }, [open])

  const label = `${typeof column.header === "string" ? column.header : "컬럼"} 필터`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={setTriggerRef}
          type="button"
          className={cn(
            "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
            "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
            "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
            active && "text-blue-600 dark:text-blue-400"
          )}
          aria-label={label}
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
      <PopoverContent
        ref={contentRef}
        align="end"
        className="w-64 p-3"
        aria-label={label}
        collisionBoundary={gridRef.current ?? undefined}
        collisionPadding={8}
      >
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
          emptyMessage={filter.emptyMessage}
          searchable={filter.searchable}
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
          emptyMessage={filter.emptyMessage}
          searchable={filter.searchable}
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
