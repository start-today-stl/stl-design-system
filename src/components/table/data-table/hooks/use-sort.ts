import * as React from "react"

import type { SortDirection } from "@/components/table/table"
import type { SortState } from "../types"

interface UseSortOptions<T> {
  sortState: SortState<T>[] | SortState<T> | undefined
  onSortChange: ((sortState: SortState<T>[]) => void) | undefined
  multiSort: boolean
  shouldWarn: boolean
}

/**
 * 정렬 hook
 * - sortState 배열 정규화 (legacy 단일 객체 호환)
 * - 단일/다중 정렬 모드 핸들링
 * - 정렬 방향 및 다중 정렬 우선순위 조회 헬퍼
 */
export function useSort<T>({
  sortState,
  onSortChange,
  multiSort,
  shouldWarn,
}: UseSortOptions<T>) {
  const sortStateArray: SortState<T>[] = React.useMemo(() => {
    if (!sortState) return []
    if (!Array.isArray(sortState)) {
      // 구 API(단일 객체) 호환: dev 환경에서만 경고
      if (shouldWarn) {
        console.warn(
          "[DataTable] sortState는 배열(SortState<T>[])이어야 합니다. " +
          "마이그레이션 가이드: docs/MIGRATION-DATATABLE-SORT.md",
        )
      }
      const legacy = sortState as SortState<T>
      return legacy.column && legacy.direction ? [legacy] : []
    }
    return sortState.filter((s) => s.column && s.direction)
  }, [sortState, shouldWarn])

  const handleSort = React.useCallback(
    (column: keyof T) => {
      if (!onSortChange) return
      const existing = sortStateArray.find((s) => s.column === column)

      if (multiSort) {
        // 다중 정렬 모드: 클릭으로 정렬 추가/순환
        let newArr: SortState<T>[]
        if (!existing) {
          newArr = [...sortStateArray, { column, direction: "asc" }]
        } else if (existing.direction === "asc") {
          newArr = sortStateArray.map((s) =>
            s.column === column ? { column, direction: "desc" as SortDirection } : s,
          )
        } else {
          newArr = sortStateArray.filter((s) => s.column !== column)
        }
        onSortChange(newArr)
      } else {
        // 단일 정렬 모드: 그 컬럼만 정렬, asc→desc→해제 순환
        let next: SortState<T>[]
        if (existing) {
          if (existing.direction === "asc") {
            next = [{ column, direction: "desc" }]
          } else if (existing.direction === "desc") {
            next = []
          } else {
            next = [{ column, direction: "asc" }]
          }
        } else {
          next = [{ column, direction: "asc" }]
        }
        onSortChange(next)
      }
    },
    [sortStateArray, multiSort, onSortChange],
  )

  const getSortDirection = React.useCallback(
    (column: keyof T): SortDirection => {
      const found = sortStateArray.find((s) => s.column === column)
      return found?.direction ?? null
    },
    [sortStateArray],
  )

  /** 다중 정렬 시 우선순위 번호 (1부터, 단일이거나 정렬 없으면 undefined) */
  const getSortPriority = React.useCallback(
    (column: keyof T): number | undefined => {
      if (!multiSort || sortStateArray.length <= 1) return undefined
      const idx = sortStateArray.findIndex((s) => s.column === column)
      return idx === -1 ? undefined : idx + 1
    },
    [sortStateArray, multiSort],
  )

  return { sortStateArray, handleSort, getSortDirection, getSortPriority }
}
