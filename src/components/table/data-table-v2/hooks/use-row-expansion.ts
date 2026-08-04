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

  // 상태를 ref 로 흡수 — toggle 콜백 ref stable 유지 (deps 에 상태 넣으면 확장 변경마다 rebind → row 리렌더)
  const expandedSetRef = React.useRef(expandedSet)
  expandedSetRef.current = expandedSet
  const allExpandedRef = React.useRef(allExpanded)
  allExpandedRef.current = allExpanded
  const expandableRowsRef = React.useRef(expandableRows)
  expandableRowsRef.current = expandableRows

  const toggleRow = React.useCallback(
    (id: T["id"]) => {
      const next = new Set(expandedSetRef.current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      commit(next)
    },
    [commit]
  )

  const toggleAll = React.useCallback(() => {
    if (allExpandedRef.current) commit(new Set())
    else commit(new Set(expandableRowsRef.current.map((r) => r.id)))
  }, [commit])

  return { expandedSet, isExpanded, canExpand, allExpanded, toggleRow, toggleAll }
}
