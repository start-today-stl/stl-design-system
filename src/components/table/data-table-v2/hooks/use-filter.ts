import * as React from "react"

interface UseFilterOptions {
  /** controlled filter state */
  filterState?: Record<string, unknown>
  /** uncontrolled 초기 필터 상태 */
  defaultFilterState?: Record<string, unknown>
  /** 필터 변경 콜백 */
  onFilterChange?: (filterState: Record<string, unknown>) => void
}

/**
 * 컬럼 필터 상태 관리 hook.
 * - controlled: filterState 가 있으면 그 값을 그대로 사용. 변경 시 onFilterChange 만 호출
 * - uncontrolled: filterState 없으면 내부 상태로 관리. onFilterChange 는 있으면 함께 호출
 * - value 를 undefined 로 넘기면 해당 컬럼 필터 제거 (활성 필터 판정에서 제외)
 */
export function useFilter({
  filterState,
  defaultFilterState,
  onFilterChange,
}: UseFilterOptions) {
  const [internalState, setInternalState] = React.useState<
    Record<string, unknown>
  >(defaultFilterState ?? {})

  const currentState = filterState ?? internalState

  const setColumnFilter = React.useCallback(
    (columnKey: string, value: unknown) => {
      const next = { ...currentState }
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        delete next[columnKey]
      } else {
        next[columnKey] = value
      }
      if (!filterState) {
        setInternalState(next)
      }
      onFilterChange?.(next)
    },
    [currentState, filterState, onFilterChange]
  )

  const getColumnFilter = React.useCallback(
    (columnKey: string): unknown => currentState[columnKey],
    [currentState]
  )

  const hasActiveFilter = React.useCallback(
    (columnKey: string): boolean => {
      const v = currentState[columnKey]
      if (v === undefined || v === null || v === "") return false
      if (Array.isArray(v) && v.length === 0) return false
      return true
    },
    [currentState]
  )

  return {
    filterState: currentState,
    setColumnFilter,
    getColumnFilter,
    hasActiveFilter,
  }
}
