import * as React from "react"

import type { RowGroupConfig } from "../types"

interface UseRowGroupingOptions<T> {
  data: T[]
  rowGrouping: RowGroupConfig<T> | undefined
}

interface RowGroupingResult<T> {
  rowSpanMap: Map<number, Map<keyof T, number>> | null
  middleRowSet: Set<number> | null
  getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined
}

/**
 * 로우 그룹핑(셀 병합) hook
 * - groupBy 컬럼 기준으로 연속된 같은 값의 행들을 rowSpan으로 병합
 * - 그룹 중간 행(border-b 제거 대상) Set 계산
 */
export function useRowGrouping<T extends { id: string | number }>({
  data,
  rowGrouping,
}: UseRowGroupingOptions<T>): RowGroupingResult<T> {
  const { rowSpanMap, middleRowSet } = React.useMemo(() => {
    if (!rowGrouping) return { rowSpanMap: null, middleRowSet: null }

    const groupByKeys = Array.isArray(rowGrouping.groupBy)
      ? rowGrouping.groupBy
      : [rowGrouping.groupBy]
    const mergeColumns = rowGrouping.mergeColumns ?? groupByKeys

    const spanMap = new Map<number, Map<keyof T, number>>()
    const middleRows = new Set<number>()

    for (const colKey of mergeColumns) {
      let i = 0
      while (i < data.length) {
        const currentGroupValues = groupByKeys.map((k) => data[i][k])
        const currentColValue = data[i][colKey]
        let spanCount = 1

        for (let j = i + 1; j < data.length; j++) {
          const nextGroupValues = groupByKeys.map((k) => data[j][k])
          const nextColValue = data[j][colKey]

          const sameGroup = currentGroupValues.every((v, idx) => v === nextGroupValues[idx])
          const sameValue = currentColValue === nextColValue

          if (sameGroup && sameValue) {
            spanCount++
          } else {
            break
          }
        }

        if (!spanMap.has(i)) {
          spanMap.set(i, new Map())
        }
        spanMap.get(i)!.set(colKey, spanCount)

        for (let k = i; k < i + spanCount - 1; k++) {
          middleRows.add(k)
        }
        for (let k = i + 1; k < i + spanCount; k++) {
          if (!spanMap.has(k)) {
            spanMap.set(k, new Map())
          }
          spanMap.get(k)!.set(colKey, 0)
        }

        i += spanCount
      }
    }

    return { rowSpanMap: spanMap, middleRowSet: middleRows }
  }, [data, rowGrouping])

  const getRowSpan = React.useCallback(
    (rowIndex: number, columnKey: keyof T): number | undefined => {
      if (!rowSpanMap) return undefined
      const rowMap = rowSpanMap.get(rowIndex)
      if (!rowMap) return undefined
      return rowMap.get(columnKey)
    },
    [rowSpanMap],
  )

  return { rowSpanMap, middleRowSet, getRowSpan }
}

/** rowGrouping 그룹 head 행의 머지 셀별 selected/hovered flag. column key 별로 lookup. */
export interface GroupCellFlags {
  selected: Record<string, boolean>
  hovered: Record<string, boolean>
}
