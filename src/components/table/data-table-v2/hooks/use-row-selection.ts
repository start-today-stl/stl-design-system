import * as React from "react"

interface UseRowSelectionOptions<T extends { id: string | number }> {
  data: T[]
  selectable: boolean
  selectedIds?: (string | number)[]
  defaultSelectedIds?: (string | number)[]
  onSelectionChange?: (selectedIds: (string | number)[]) => void
}

/**
 * 행 선택 hook (체크박스).
 * - controlled (selectedIds) 또는 uncontrolled (defaultSelectedIds) 지원
 * - shift+click 으로 범위 선택
 * - "전체 선택" 헤더 체크박스 지원
 */
export function useRowSelection<T extends { id: string | number }>({
  data,
  selectable,
  selectedIds,
  defaultSelectedIds,
  onSelectionChange,
}: UseRowSelectionOptions<T>) {
  const [internalSelected, setInternalSelected] = React.useState<Set<T["id"]>>(
    () => new Set(defaultSelectedIds ?? [])
  )

  const selectedSet = React.useMemo<Set<T["id"]>>(() => {
    if (!selectable) return new Set()
    if (selectedIds) return new Set(selectedIds)
    return internalSelected
  }, [selectable, selectedIds, internalSelected])

  const lastClickedIndex = React.useRef<number | null>(null)

  const commit = React.useCallback(
    (next: Set<T["id"]>) => {
      if (onSelectionChange) onSelectionChange(Array.from(next) as (string | number)[])
      else setInternalSelected(next)
    },
    [onSelectionChange]
  )

  const isSelected = React.useCallback(
    (id: T["id"]) => selectedSet.has(id),
    [selectedSet]
  )

  const allSelected = data.length > 0 && data.every((row) => selectedSet.has(row.id))
  const someSelected = !allSelected && data.some((row) => selectedSet.has(row.id))

  // selectedSet / data / allSelected 를 ref 로 흡수 — toggleRow / toggleAll 콜백 ref stable 유지.
  // (deps 에 selectedSet 넣으면 선택 변경마다 콜백 rebind → 모든 row prop 변경 → 리렌더)
  const selectedSetRef = React.useRef(selectedSet)
  selectedSetRef.current = selectedSet
  const dataRef = React.useRef(data)
  dataRef.current = data
  const allSelectedRef = React.useRef(allSelected)
  allSelectedRef.current = allSelected

  const toggleRow = React.useCallback(
    (id: T["id"], rowIndex: number, shiftKey: boolean) => {
      const next = new Set(selectedSetRef.current)
      const currentlySelected = next.has(id)

      if (shiftKey && lastClickedIndex.current !== null) {
        const [start, end] =
          lastClickedIndex.current < rowIndex
            ? [lastClickedIndex.current, rowIndex]
            : [rowIndex, lastClickedIndex.current]
        for (let i = start; i <= end; i++) {
          const row = dataRef.current[i]
          if (!row) continue
          if (currentlySelected) next.delete(row.id)
          else next.add(row.id)
        }
      } else {
        if (currentlySelected) next.delete(id)
        else next.add(id)
      }

      lastClickedIndex.current = rowIndex
      commit(next)
    },
    [commit]
  )

  const toggleAll = React.useCallback(() => {
    if (allSelectedRef.current) {
      commit(new Set())
    } else {
      commit(new Set(dataRef.current.map((row) => row.id)))
    }
    lastClickedIndex.current = null
  }, [commit])

  return { selectedSet, isSelected, allSelected, someSelected, toggleRow, toggleAll }
}
