import * as React from "react"

import { cn } from "@/lib/utils"
import { DataTableV2Row } from "./data-table-v2-row"
import type { DataTableV2Column, DataTableV2Props } from "./types"

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

/**
 * DataTable v2 — div role=grid 기반 그리드 컨테이너.
 *
 * SDS-29 (코어 구조):
 * - 3-layer 구조 (outer wrapper / header / body scroller)
 * - 절대좌표 기반 행 배치 (position absolute + transform translate3d + Math.round)
 * - ResizeObserver 로 각 행 실제 높이 측정 후 다음 행 위치 재계산
 *
 * 후속 티켓에서 확장 예정:
 * - SDS-30 컬럼 정렬 / headerGroups
 * - SDS-31 sticky 컬럼 (별도 container)
 * - SDS-32 컬럼 리사이즈 / 재정렬
 * - SDS-33 행 선택 / 클릭 / 확장행
 * - SDS-34 셀 편집
 * - SDS-35 rowActions / loading / emptyMessage
 * - SDS-36 rowReorderable + 가상화 호환
 * - SDS-37 rowGrouping + 가상화 호환
 * - SDS-38 가상화 통합 + WAI-ARIA grid 접근성
 */
export function DataTableV2<T extends { id: string | number }>({
  data,
  columns,
  maxHeight,
  estimateRowHeight = DEFAULT_ESTIMATE,
  className,
}: DataTableV2Props<T>) {
  // grid-template-columns 문자열 — 헤더와 본문 행이 공유
  const gridTemplateColumns = React.useMemo(
    () => columns.map(columnTrack).join(" "),
    [columns]
  )

  // 각 행 실제 높이 저장 (id -> px). 미측정 시 estimateRowHeight 사용.
  const [heights, setHeights] = React.useState<Map<T["id"], number>>(new Map())

  const setHeight = React.useCallback((id: T["id"], height: number) => {
    setHeights((prev) => {
      if (prev.get(id) === height) return prev
      const next = new Map(prev)
      next.set(id, height)
      return next
    })
  }, [])

  // 누적 y 좌표 배열 (data 순서 기준). positions[i] = 행 i 의 top y.
  // positions[data.length] = 총 컨텐츠 높이.
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

  return (
    <div
      role="grid"
      aria-rowcount={data.length + 1 /* header + body rows */}
      aria-colcount={columns.length}
      className={cn(
        "w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-900",
        className
      )}
    >
      {/* Header layer */}
      <div
        role="row"
        className="grid border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
        style={{ gridTemplateColumns }}
      >
        {columns.map((col) => {
          const colId = col.id ?? String(col.accessorKey)
          return (
            <div
              key={colId}
              role="columnheader"
              className={cn(
                "flex items-center px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200",
                alignClass[col.align ?? "left"]
              )}
            >
              {col.header}
            </div>
          )
        })}
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
