import * as React from "react"

import { cn } from "@/lib/utils"
import { DataTableV2ColumnSeparator } from "./data-table-v2-column-separator"
import { DataTableV2FilterCell } from "./data-table-v2-filter-cell"
import { DataTableV2SortableHeaderCell } from "./data-table-v2-sortable-header-cell"
import { alignClass } from "./constants"
import type { DataTableV2Column, SortDirection } from "./types"

/** 정렬 인디케이터 — 정렬 상태가 바뀐 컬럼만 다시 그리도록 memo */
const SortArrow = React.memo(function SortArrow({
  direction,
  active,
}: {
  direction: "up" | "down"
  active: boolean
}) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "transition-colors",
        active ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        direction === "down" && "rotate-180"
      )}
    >
      <path d="M4 0L8 5H0L4 0Z" fill="currentColor" />
    </svg>
  )
})

export interface DataTableV2HeaderCellProps<T> {
  column: DataTableV2Column<T>
  width: number | undefined
  minWidth: number | undefined
  leftOffset: number | undefined
  rightOffset: number | undefined
  isLeftPinned: boolean
  isRightPinned: boolean
  isLeftBoundary: boolean
  isRightBoundary: boolean
  isFirstRightPinned: boolean
  /** 컬럼 재정렬 대상인지 (드래그 핸들 표시) */
  isDraggable: boolean
  isLastColumn: boolean
  /**
   * 정렬 상태는 **원시값으로 쪼개서** 받는다.
   * getSortInfo(key) 결과 객체를 그대로 넘기면 매 렌더 새 객체라 memo 가 무효가 된다.
   */
  sortDirection: SortDirection | undefined
  sortPriority: number | undefined
  onSort: (key: keyof T) => void
  /** 이 컬럼의 필터 값 / 활성 여부 — 값으로 받아야 자기 필터가 바뀔 때만 리렌더된다 */
  filterValue: unknown
  filterActive: boolean
  onColumnFilterChange: (columnKey: string, value: unknown) => void
  resizable: boolean
  isResizing: boolean
  onResizeStart: (e: React.MouseEvent, column: unknown) => void
  headerBg: string
}

function DataTableV2HeaderCellInner<T>({
  column,
  width,
  minWidth,
  leftOffset,
  rightOffset,
  isLeftPinned,
  isRightPinned,
  isLeftBoundary,
  isRightBoundary,
  isFirstRightPinned,
  isDraggable,
  isLastColumn,
  sortDirection,
  sortPriority,
  onSort,
  filterValue,
  filterActive,
  onColumnFilterChange,
  resizable,
  isResizing,
  onResizeStart,
  headerBg,
}: DataTableV2HeaderCellProps<T>) {
  const isPinned = isLeftPinned || isRightPinned

  // Outer: 순수 레이아웃/포지셔닝. text 스타일은 content container 에.
  // 모든 셀에 bg 부여 (pinned 여부 무관) → 가로 스크롤 우측 끝에서 마지막 컬럼 bg 로 자연 커버
  // (right pinned 없는 케이스에서 wrapper 우측 흰 gap 발생 방지)
  const outerCls = cn(
    "relative flex min-h-9",
    width !== undefined && "shrink-0",
    isPinned && "sticky z-20",
    headerBg,
    isLeftBoundary && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    isRightBoundary && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    column.sortable && "select-none",
    isFirstRightPinned && "ml-auto"
  )
  const style: React.CSSProperties = {
    width,
    minWidth,
    flex: width === undefined ? "1 1 0" : undefined,
    left: isLeftPinned ? leftOffset : undefined,
    right: isRightPinned ? rightOffset : undefined,
  }

  // Content container 는 3 슬롯 (헤더명+정렬 / 필터 / 미래 확장) 구조.
  // alignClass 는 슬롯 1 내부에만 적용해서 필터 아이콘 위치에 영향 안 주게 함.
  const contentBody = column.sortable ? (
    <button
      type="button"
      className={cn(
        "flex w-full min-w-0 items-center gap-1 cursor-pointer",
        // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
        column.align === "right"
          ? "flex-row-reverse justify-start"
          : alignClass[column.align ?? "left"]
      )}
      onClick={() => onSort(column.accessorKey)}
    >
      <span className="min-w-0 truncate">{column.header}</span>
      <span className="flex shrink-0 items-center gap-0.5">
        <span className="flex flex-col gap-0.5">
          <SortArrow direction="up" active={sortDirection === "asc"} />
          <SortArrow direction="down" active={sortDirection === "desc"} />
        </span>
        {sortPriority !== undefined && (
          <span className="text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none">
            {sortPriority}
          </span>
        )}
      </span>
    </button>
  ) : (
    <span className="min-w-0 truncate">{column.header}</span>
  )

  const columnKey = String(column.accessorKey)
  const filterCell = column.filter ? (
    <DataTableV2FilterCell
      column={column}
      filter={column.filter}
      value={filterValue}
      active={filterActive}
      onChange={onColumnFilterChange}
      columnKey={columnKey}
    />
  ) : null

  // 오른쪽 정렬 컬럼(주로 숫자)은 데이터 값이 우측 끝에 몰리므로 필터 아이콘을 좌측에 배치.
  // 정렬 화살표의 flex-row-reverse 처리와 같은 UX 원칙 (AG Grid 등 표준).
  const contentInner = (
    <div
      className={cn(
        "flex-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-300 min-w-0",
        column.align === "right" && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex-1 flex items-center gap-1 min-w-0 overflow-hidden",
          alignClass[column.align ?? "left"]
        )}
      >
        {contentBody}
      </div>
      {filterCell}
    </div>
  )

  const separator = !isLastColumn && (
    <DataTableV2ColumnSeparator
      resizable={resizable}
      isResizing={isResizing}
      onResizeStart={onResizeStart}
      column={column}
    />
  )

  const ariaSort: "ascending" | "descending" | "none" | undefined = column.sortable
    ? sortDirection === "asc"
      ? "ascending"
      : sortDirection === "desc"
        ? "descending"
        : "none"
    : undefined

  if (isDraggable) {
    return (
      <DataTableV2SortableHeaderCell
        id={columnKey}
        className={outerCls}
        style={style}
        dataColumnKey={columnKey}
        ariaSort={ariaSort}
      >
        {contentInner}
        {separator}
      </DataTableV2SortableHeaderCell>
    )
  }

  return (
    <div
      role="columnheader"
      data-column-key={columnKey}
      className={outerCls}
      style={style}
      aria-sort={ariaSort}
    >
      {contentInner}
      {separator}
    </div>
  )
}

type DataTableV2HeaderCellComponent = <T>(
  props: DataTableV2HeaderCellProps<T>
) => React.ReactElement | null

/**
 * 헤더 셀 — **헤더 행과 별개의 memo 단위**.
 *
 * 헤더 행이 memo 최소 단위이면, 행 체크박스를 하나 누를 때 (전체선택 체크박스 상태가
 * 바뀌므로) 헤더 셀이 전부 다시 그려진다. 정렬 클릭 / 필터 변경도 마찬가지로
 * 관계없는 컬럼까지 번진다.
 *
 * ⚠️ 정렬 상태와 필터 값은 **원시값으로 쪼개서** 받는다. `getSortInfo(key)` 결과
 * 객체를 그대로 넘기면 매 렌더 새 객체라 memo 가 통째로 무효가 된다.
 */
export const DataTableV2HeaderCell = React.memo(
  DataTableV2HeaderCellInner
) as DataTableV2HeaderCellComponent
