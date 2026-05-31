import * as React from "react"

import type { DataTableColumn, HeaderGroup, StickyStyleResult } from "../types"
import { getNumericColumnWidth } from "../utils"

interface UseHeaderGroupsOptions<T> {
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
}

export type HeaderItem<T> =
  | { type: "standalone"; col: DataTableColumn<T> }
  | { type: "group"; group: HeaderGroup<T> }

/**
 * 다중 레벨 헤더 + 헤더 그룹 관련 hook
 * - colSpan 계산
 * - 그룹 헤더의 sticky 스타일 계산
 * - 렌더링 순서 아이템 배열
 * - 그룹 경계 컬럼 (구분선 표시) 식별
 */
export function useHeaderGroups<T>({
  columnsToRender,
  headerGroups,
  getStickyStyles,
  getColumnWidth,
  resizable,
}: UseHeaderGroupsOptions<T>) {
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
