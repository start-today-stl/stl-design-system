import * as React from "react"

import { cn } from "@/lib/utils"
import { DataTableV2Row } from "./data-table-v2-row"
import type {
  DataTableV2Column,
  DataTableV2Props,
  HeaderGroup,
  SortDirection,
  SortState,
} from "./types"

const DEFAULT_ESTIMATE = 40

/**
 * width / minWidth 를 CSS grid-template-columns 조각으로 변환.
 * - width 지정: 그대로 (숫자면 px)
 * - minWidth 만 지정: minmax(minWidth, 1fr)
 * - 미지정: 1fr
 */
function columnTrack<T>(col: DataTableV2Column<T>): string {
  const toDim = (v: string | number) => (typeof v === "number" ? `${v}px` : v)
  if (col.width !== undefined) return toDim(col.width)
  if (col.minWidth !== undefined) return `minmax(${toDim(col.minWidth)}, 1fr)`
  return "1fr"
}

const alignClass = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
}

/** 정렬 화살표 (▲/▼). 활성 방향만 파랑, 나머지는 흐린 회색 */
function SortArrow({ direction, active }: { direction: "up" | "down"; active: boolean }) {
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
}

/**
 * 헤더 클릭 시 다음 정렬 상태 계산.
 * - 단일 정렬 모드: asc → desc → 해제 순환. 다른 컬럼 클릭 시 그 컬럼만 asc.
 * - 다중 정렬 모드: 없으면 asc 추가, 이미 있으면 asc→desc→제거 순환. 다른 컬럼은 유지.
 */
function computeNextSort<T>(
  current: SortState<T>[],
  column: keyof T,
  multiSort: boolean
): SortState<T>[] {
  const existing = current.find((s) => s.column === column)

  if (multiSort) {
    if (!existing) return [...current, { column, direction: "asc" }]
    if (existing.direction === "asc") {
      return current.map((s) =>
        s.column === column ? { column, direction: "desc" as SortDirection } : s
      )
    }
    return current.filter((s) => s.column !== column)
  }

  if (!existing) return [{ column, direction: "asc" }]
  if (existing.direction === "asc") return [{ column, direction: "desc" }]
  return []
}

/**
 * headerGroups 를 (컬럼 인덱스, 그룹) 위치 정보로 변환.
 * - 각 그룹의 컬럼들이 실제 columns 배열에서 인접해있어야 유효.
 * - 반환: 그룹별 { startCol, span, group }.
 */
function computeHeaderGroupPositions<T>(
  columns: DataTableV2Column<T>[],
  headerGroups: HeaderGroup<T>[]
): Array<{ startCol: number; span: number; group: HeaderGroup<T> }> {
  const positions: Array<{ startCol: number; span: number; group: HeaderGroup<T> }> = []
  for (const group of headerGroups) {
    if (group.columns.length === 0) continue
    const first = columns.findIndex((c) => c.accessorKey === group.columns[0])
    if (first < 0) continue
    // grid-column-start 는 1-based
    positions.push({ startCol: first + 1, span: group.columns.length, group })
  }
  return positions
}

/** DataTable v2 — div role=grid 기반 그리드 컨테이너 */
export function DataTableV2<T extends { id: string | number }>({
  data,
  columns,
  headerGroups,
  sortState,
  onSortChange,
  multiSort = false,
  maxHeight,
  estimateRowHeight = DEFAULT_ESTIMATE,
  className,
}: DataTableV2Props<T>) {
  // grid-template-columns 문자열 — 헤더와 본문 행이 공유
  const gridTemplateColumns = React.useMemo(
    () => columns.map(columnTrack).join(" "),
    [columns]
  )

  // 정렬 상태 정규화
  const normalizedSortState = React.useMemo<SortState<T>[]>(
    () => sortState ?? [],
    [sortState]
  )

  const getSortInfo = React.useCallback(
    (column: keyof T): { direction: SortDirection; priority: number | undefined } => {
      const idx = normalizedSortState.findIndex((s) => s.column === column)
      if (idx < 0) return { direction: null, priority: undefined }
      const found = normalizedSortState[idx]
      return {
        direction: found.direction,
        priority: multiSort && normalizedSortState.length > 1 ? idx + 1 : undefined,
      }
    },
    [normalizedSortState, multiSort]
  )

  const handleSort = React.useCallback(
    (column: keyof T) => {
      if (!onSortChange) return
      onSortChange(computeNextSort(normalizedSortState, column, multiSort))
    },
    [normalizedSortState, multiSort, onSortChange]
  )

  // headerGroups 위치 계산
  const headerGroupPositions = React.useMemo(
    () =>
      headerGroups && headerGroups.length > 0
        ? computeHeaderGroupPositions(columns, headerGroups)
        : [],
    [columns, headerGroups]
  )
  const hasGroups = headerGroupPositions.length > 0

  // 행 높이 저장 (id -> px). 미측정 시 estimateRowHeight 사용.
  const [heights, setHeights] = React.useState<Map<T["id"], number>>(new Map())

  const setHeight = React.useCallback((id: T["id"], height: number) => {
    setHeights((prev) => {
      if (prev.get(id) === height) return prev
      const next = new Map(prev)
      next.set(id, height)
      return next
    })
  }, [])

  // 누적 y 좌표 배열. positions[i] = 행 i 의 top y. positions[data.length] = 총 컨텐츠 높이.
  const positions = React.useMemo(() => {
    const arr = new Array<number>(data.length + 1)
    arr[0] = 0
    for (let i = 0; i < data.length; i++) {
      const h = heights.get(data[i].id) ?? estimateRowHeight
      arr[i + 1] = arr[i] + h
    }
    return arr
  }, [data, heights, estimateRowHeight])

  const totalHeight = positions[data.length]

  // 헤더 rowcount 계산 (그룹 있으면 2)
  const headerRowCount = hasGroups ? 2 : 1

  return (
    <div
      role="grid"
      aria-rowcount={data.length + headerRowCount}
      aria-colcount={columns.length}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm",
        "bg-white dark:bg-slate-900",
        className
      )}
    >
      {/* Header layer */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
        {/* 그룹 행 (headerGroups 지정 시) */}
        {hasGroups && (
          <div
            role="row"
            className="grid border-b border-slate-200 dark:border-slate-700"
            style={{ gridTemplateColumns }}
          >
            {headerGroupPositions.map((pos, idx) => (
              <div
                key={idx}
                role="columnheader"
                className={cn(
                  "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 last:border-r-0",
                  alignClass[pos.group.align ?? "center"]
                )}
                style={{
                  gridColumnStart: pos.startCol,
                  gridColumnEnd: `span ${pos.span}`,
                }}
              >
                {pos.group.header}
              </div>
            ))}
          </div>
        )}

        {/* 컬럼 행 */}
        <div role="row" className="grid" style={{ gridTemplateColumns }}>
          {columns.map((col) => {
            const colId = col.id ?? String(col.accessorKey)
            const info = getSortInfo(col.accessorKey)
            const cellCls = cn(
              "flex min-h-9 items-center pl-3 pr-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
              alignClass[col.align ?? "left"]
            )
            if (col.sortable) {
              return (
                <div
                  key={colId}
                  role="columnheader"
                  className={cn(cellCls, "select-none")}
                  aria-sort={
                    info.direction === "asc"
                      ? "ascending"
                      : info.direction === "desc"
                        ? "descending"
                        : "none"
                  }
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-1 text-left cursor-pointer"
                    onClick={() => handleSort(col.accessorKey)}
                  >
                    {col.header}
                    <span className="flex items-center gap-0.5">
                      <span className="flex flex-col gap-0.5">
                        <SortArrow direction="up" active={info.direction === "asc"} />
                        <SortArrow direction="down" active={info.direction === "desc"} />
                      </span>
                      {info.priority !== undefined && (
                        <span className="text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none">
                          {info.priority}
                        </span>
                      )}
                    </span>
                  </button>
                </div>
              )
            }
            return (
              <div key={colId} role="columnheader" className={cellCls}>
                {col.header}
              </div>
            )
          })}
        </div>
      </div>

      {/* Body scroller */}
      <div
        className="relative overflow-auto"
        style={{ maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }}
      >
        {/* 총 높이만큼 컨테이너를 늘려서 스크롤 영역 확보 */}
        <div className="relative" style={{ height: `${totalHeight}px` }}>
          {data.map((row, i) => (
            <DataTableV2Row
              key={row.id}
              row={row}
              columns={columns}
              gridTemplateColumns={gridTemplateColumns}
              translateY={positions[i]}
              onHeightChange={setHeight}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
