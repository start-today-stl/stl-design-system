import * as React from "react"

import type { DataTableColumn, HeaderGroup, StickyStyleResult } from "../types"
import { getNumericColumnWidth } from "../utils"

interface UseHeaderGroupsOptions<T> {
  columns: DataTableColumn<T>[]
  columnsToRender: DataTableColumn<T>[]
  headerGroups: HeaderGroup<T>[] | undefined
  getStickyStyles: (
    column: DataTableColumn<T>,
    isHeader: boolean,
    isSelected?: boolean,
    groupCellSelected?: boolean,
  ) => StickyStyleResult
  getColumnWidth: (column: DataTableColumn<T>) => number | undefined
  resizable: boolean
  shouldWarn: boolean
}

export type HeaderItem<T> =
  | { type: "standalone"; col: DataTableColumn<T> }
  | { type: "group"; group: HeaderGroup<T> }

/**
 * 다중 레벨 헤더 + 헤더 그룹 관련 hook
 * - sticky/non-sticky 혼합 그룹 검증 + 경고
 * - colSpan 계산
 * - 그룹 헤더의 sticky 스타일 계산
 * - 렌더링 순서 아이템 배열
 * - 그룹 경계 컬럼 (구분선 표시) 식별
 */
export function useHeaderGroups<T>({
  columns,
  columnsToRender,
  headerGroups,
  getStickyStyles,
  getColumnWidth,
  resizable,
  shouldWarn,
}: UseHeaderGroupsOptions<T>) {
  // sticky 구성이 혼합된 그룹 식별 (검증용)
  const mixedStickyHeaderGroups = React.useMemo(() => {
    if (!headerGroups || headerGroups.length === 0) return []

    const columnMap = new Map<keyof T, DataTableColumn<T>>(
      columns.map((col) => [col.accessorKey, col]),
    )

    return headerGroups.flatMap((group, groupIndex) => {
      const groupColumns = group.columns
        .map((columnKey) => columnMap.get(columnKey))
        .filter((col): col is DataTableColumn<T> => col !== undefined)

      if (groupColumns.length === 0) return []

      const stickyDirections = new Set(
        groupColumns
          .map((col) => col.sticky)
          .filter((direction): direction is "left" | "right" => direction !== undefined),
      )

      const hasSticky = stickyDirections.size > 0
      const hasNonSticky = groupColumns.some((col) => !col.sticky)
      const hasMixedStickyDirection = stickyDirections.size > 1
      const isMixedStickyConfig = hasSticky && (hasNonSticky || hasMixedStickyDirection)

      if (!isMixedStickyConfig) return []

      const headerLabel =
        typeof group.header === "string" || typeof group.header === "number"
          ? String(group.header)
          : `#${groupIndex + 1}`

      return [
        {
          headerLabel,
          reason: hasMixedStickyDirection
            ? "left/right sticky 혼합"
            : "sticky/non-sticky 혼합",
        },
      ]
    })
  }, [headerGroups, columns])

  // 경고 1회 출력 (key 변경 시에만)
  const mixedStickyWarningKey = React.useMemo(
    () =>
      mixedStickyHeaderGroups
        .map((group) => `${group.headerLabel}:${group.reason}`)
        .join("|"),
    [mixedStickyHeaderGroups],
  )
  const mixedStickyWarnedKeyRef = React.useRef("")

  React.useEffect(() => {
    if (!shouldWarn) return
    if (!mixedStickyWarningKey) {
      mixedStickyWarnedKeyRef.current = ""
      return
    }
    if (mixedStickyWarnedKeyRef.current === mixedStickyWarningKey) return
    mixedStickyWarnedKeyRef.current = mixedStickyWarningKey

    const groupSummary = mixedStickyHeaderGroups
      .map((group) => `${group.headerLabel}(${group.reason})`)
      .join(", ")

    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. " +
      "그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + groupSummary,
    )
  }, [mixedStickyWarningKey, mixedStickyHeaderGroups, shouldWarn])

  // 그룹에 속하는 컬럼들 Set
  const groupedColumnsSet = React.useMemo(() => {
    if (!headerGroups) return new Set<keyof T>()
    return new Set(headerGroups.flatMap((g) => g.columns))
  }, [headerGroups])

  // 그룹 경계 컬럼 (right border 표시 대상)
  const columnsWithRightBorder = React.useMemo(() => {
    if (!headerGroups || headerGroups.length === 0) return new Set<keyof T>()
    const borderCols = new Set<keyof T>()

    const getGroupIndex = (col: DataTableColumn<T>) =>
      headerGroups.findIndex((g) => g.columns.includes(col.accessorKey))

    const groupedCols = columnsToRender.filter((col) => groupedColumnsSet.has(col.accessorKey))

    for (let i = 0; i < groupedCols.length - 1; i++) {
      const currentCol = groupedCols[i]
      const nextCol = groupedCols[i + 1]
      if (getGroupIndex(currentCol) !== getGroupIndex(nextCol)) {
        borderCols.add(currentCol.accessorKey)
      }
    }

    return borderCols
  }, [headerGroups, columnsToRender, groupedColumnsSet])

  // 그룹 colSpan 계산
  const getHeaderGroupColSpan = React.useCallback(
    (group: HeaderGroup<T>): number =>
      columnsToRender.filter((col) => group.columns.includes(col.accessorKey)).length,
    [columnsToRender],
  )

  // 그룹 셀의 sticky 스타일 (그룹 내 모든 컬럼이 같은 방향 sticky일 때만)
  const getHeaderGroupStickyData = React.useCallback(
    (group: HeaderGroup<T>): StickyStyleResult => {
      const groupCols = columnsToRender.filter((col) => group.columns.includes(col.accessorKey))
      if (groupCols.length === 0) return { style: {}, className: "" }

      const allLeftSticky = groupCols.every((col) => col.sticky === "left")
      const allRightSticky = groupCols.every((col) => col.sticky === "right")
      if (!allLeftSticky && !allRightSticky) return { style: {}, className: "" }

      const anchorColumn = allLeftSticky ? groupCols[0] : groupCols[groupCols.length - 1]
      const anchorSticky = getStickyStyles(anchorColumn, true)

      const getWidth = (col: DataTableColumn<T>) => {
        const resizedWidth = resizable ? getColumnWidth(col) : undefined
        if (resizedWidth !== undefined) return resizedWidth
        return getNumericColumnWidth(col)
      }
      const totalWidth = groupCols.reduce((sum, col) => sum + getWidth(col), 0)
      const widthPx = `${totalWidth}px`

      return {
        style: {
          ...anchorSticky.style,
          width: widthPx,
          minWidth: widthPx,
          maxWidth: widthPx,
        },
        className: anchorSticky.className,
      }
    },
    [columnsToRender, getStickyStyles, getColumnWidth, resizable],
  )

  // 헤더 그룹 행에 렌더링할 아이템 배열 (group | standalone)
  const headerGroupItems = React.useMemo<HeaderItem<T>[]>(() => {
    if (!headerGroups || headerGroups.length === 0) return []
    const items: HeaderItem<T>[] = []
    const processedGroups = new Set<number>()

    for (const col of columnsToRender) {
      const groupIndex = headerGroups.findIndex((g) => g.columns.includes(col.accessorKey))
      if (groupIndex !== -1) {
        if (!processedGroups.has(groupIndex)) {
          processedGroups.add(groupIndex)
          items.push({ type: "group", group: headerGroups[groupIndex] })
        }
      } else {
        items.push({ type: "standalone", col })
      }
    }
    return items
  }, [headerGroups, columnsToRender])

  return {
    groupedColumnsSet,
    columnsWithRightBorder,
    getHeaderGroupColSpan,
    getHeaderGroupStickyData,
    headerGroupItems,
  }
}
