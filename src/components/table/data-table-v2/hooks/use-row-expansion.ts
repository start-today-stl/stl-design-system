import * as React from "react"

import type { ExpandableConfig } from "../types"

interface UseRowExpansionOptions<T extends { id: string | number }> {
  data: T[]
  expandable?: ExpandableConfig<T>
}

/**
 * 행 확장 hook.
 * - controlled (expandedRowIds) 또는 uncontrolled (defaultExpandedRowIds) 지원
 * - "전체 펼치기/접기" 헤더 버튼 지원
 * - rowExpandable 함수로 행별 확장 가능 여부 제어
 */
export function useRowExpansion<T extends { id: string | number }>({
  data,
  expandable,
}: UseRowExpansionOptions<T>) {
  const [internalExpanded, setInternalExpanded] = React.useState<Set<T["id"]>>(
    () => new Set(expandable?.defaultExpandedRowIds ?? [])
  )

  const expandedSet = React.useMemo<Set<T["id"]>>(() => {
    if (!expandable) return new Set()
    if (expandable.expandedRowIds) return new Set(expandable.expandedRowIds)
    return internalExpanded
  }, [expandable, internalExpanded])

  const commit = React.useCallback(
    (next: Set<T["id"]>) => {
      if (expandable?.onExpandedChange) {
        expandable.onExpandedChange(Array.from(next) as (string | number)[])
      } else {
        setInternalExpanded(next)
      }
    },
    [expandable]
  )

  const canExpand = React.useCallback(
    (row: T): boolean => {
      if (!expandable) return false
      if (!expandable.rowExpandable) return true
      return expandable.rowExpandable(row)
    },
    [expandable]
  )

  const isExpanded = React.useCallback(
    (id: T["id"]) => expandedSet.has(id),
    [expandedSet]
  )

  const expandableRows = React.useMemo(
    () => (expandable ? data.filter(canExpand) : []),
    [expandable, data, canExpand]
  )

  const allExpanded =
    expandableRows.length > 0 &&
    expandableRows.every((row) => expandedSet.has(row.id))

  const toggleRow = React.useCallback(
    (id: T["id"]) => {
      const next = new Set(expandedSet)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      commit(next)
    },
    [expandedSet, commit]
  )

  const toggleAll = React.useCallback(() => {
    if (allExpanded) commit(new Set())
    else commit(new Set(expandableRows.map((r) => r.id)))
  }, [allExpanded, expandableRows, commit])

  return { expandedSet, isExpanded, canExpand, allExpanded, toggleRow, toggleAll }
}
