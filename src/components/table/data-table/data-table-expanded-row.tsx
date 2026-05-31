import * as React from "react"

import { TableCell, TableRow } from "@/components/table/table"

export interface DataTableExpandedRowProps<T extends { id: string | number }> {
  /** 펼친 대상 행 */
  row: T
  /** 사용자 정의 펼침 영역 렌더러 (parent 에서 useStableCallback 으로 흡수된 stable ref) */
  expandedRowRender: (row: T) => React.ReactNode
  /** colSpan (전체 컬럼 수) */
  totalColumns: number
  /** 가로 스크롤 시 sticky 영역 너비 */
  visibleWidth: number
}

function DataTableExpandedRowImpl<T extends { id: string | number }>(
  props: DataTableExpandedRowProps<T>,
) {
  const { row, expandedRowRender, totalColumns, visibleWidth } = props
  return (
    <TableRow className="bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800/50">
      <TableCell colSpan={totalColumns} className="p-0" style={{ position: "relative" }}>
        <div
          className="p-4 overflow-x-auto"
          style={{
            position: "sticky",
            left: 0,
            width: visibleWidth ? `${visibleWidth}px` : "100%",
            maxWidth: "100%",
          }}
        >
          {expandedRowRender(row)}
        </div>
      </TableCell>
    </TableRow>
  )
}

/**
 * Custom equality 함수
 *
 * row reference + colSpan + visibleWidth + expandedRowRender ref 만 비교.
 * row 내용이 같고 가시 영역 너비가 같으면 펼침 영역도 동일 결과 → skip.
 *
 * (expandedRowRender 가 매 render 새 함수면 비교 fail → 모든 펼친 행 리렌더됨.
 *  사용처가 useCallback 으로 stable ref 유지하거나, DataTable 이 ctx 에서 ref 흡수해야
 *  의도한 부분 리렌더 효과를 얻을 수 있음.)
 */
function arePropsEqual<T extends { id: string | number }>(
  prev: DataTableExpandedRowProps<T>,
  next: DataTableExpandedRowProps<T>,
): boolean {
  if (prev.row !== next.row) return false
  if (prev.totalColumns !== next.totalColumns) return false
  if (prev.visibleWidth !== next.visibleWidth) return false
  if (prev.expandedRowRender !== next.expandedRowRender) return false
  return true
}

/**
 * 펼침 영역 행 컴포넌트 (React.memo + custom equality)
 *
 * 다음 조건에서 re-render 스킵:
 * - row reference 동일 (불변 업데이트 시 변경 없는 행)
 * - totalColumns / visibleWidth 동일
 * - expandedRowRender reference 동일
 *
 * → 펼침 토글 시 토글된 행의 펼침 영역만 mount/unmount,
 *   다른 펼친 행들의 영역은 prop 동일하므로 React.memo skip.
 */
export const DataTableExpandedRow = React.memo(
  DataTableExpandedRowImpl,
  arePropsEqual as unknown as (
    prev: Readonly<DataTableExpandedRowProps<{ id: string | number }>>,
    next: Readonly<DataTableExpandedRowProps<{ id: string | number }>>,
  ) => boolean,
) as <T extends { id: string | number }>(
  props: DataTableExpandedRowProps<T>,
) => React.ReactElement
