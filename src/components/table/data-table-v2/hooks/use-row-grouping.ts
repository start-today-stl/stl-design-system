import * as React from "react"

import type { RowGroupConfig } from "../types"

interface UseRowGroupingOptions<T> {
  data: T[]
  rowGrouping: RowGroupConfig<T> | undefined
}

interface RowGroupingResult<T> {
  /** rowIndex → (columnKey → span). span=0 (middle), span=1 (single), span>1 (head) */
  rowSpanMap: Map<number, Map<keyof T, number>> | null
  /** 그룹 middle row 인덱스 집합. border-b 스킵 대상 */
  middleRowSet: Set<number> | null
  /** rowIndex + columnKey → span 조회. rowGrouping 미활성 시 undefined */
  getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined
}

/**
 * 로우 그룹핑 (셀 병합) hook — v1 시맨틱 이식.
 *
 * - `groupBy` 컬럼 값이 연속으로 같은 행들을 rowSpan 으로 병합
 * - 그룹 중간 (border-b 제거 대상) row 인덱스 계산
 * - 렌더 로직 무관 (순수 데이터 기반) → 가상화와 결합 시 middle row 렌더 여부와 독립
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
    [rowSpanMap]
  )

  return { rowSpanMap, middleRowSet, getRowSpan }
}
