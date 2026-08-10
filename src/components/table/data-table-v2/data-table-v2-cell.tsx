import * as React from "react"

import { cn } from "@/lib/utils"
import { DataTableV2EditCell } from "./data-table-v2-edit-cell"
import {
  ROW_BG_DESCENDANT,
  STICKY_CELL_BASE_BG,
  alignClass,
} from "./constants"
import type { DataTableV2Column } from "./types"

export interface DataTableV2CellProps<T extends { id: string | number }> {
  row: T
  column: DataTableV2Column<T>
  /** 셀 폭. undefined 면 flex 로 남은 공간 분배 */
  width: number | undefined
  minWidth: number | undefined
  /** pinned 좌/우 offset. 해당 방향이 아니면 undefined */
  leftOffset: number | undefined
  rightOffset: number | undefined
  isLeftPinned: boolean
  isRightPinned: boolean
  isLeftBoundary: boolean
  isRightBoundary: boolean
  isFirstRightPinned: boolean
  /**
   * 사용처의 rowClassName 결과 (행 강조색). **pinned 셀에만 넘긴다.**
   *
   * pinned 셀은 sticky 라 스크롤되는 내용을 덮어야 하므로 불투명해야 한다.
   * 그런데 사용처 강조색은 반투명일 수 있어서(예: `dark:bg-red-500/15`)
   * 그 색을 셀 배경으로 그대로 쓰면 아래 컬럼이 비치고, 행 위에 두 번 칠해져
   * 색도 진해진다.
   *
   * 그래서 셀은 불투명 기본 배경을 깔고, 이 클래스는 그 위에 오버레이로 얹는다.
   * 비 pinned 영역(행 배경 위에 강조색)과 정확히 같은 합성 결과가 된다.
   */
  rowHighlightClass?: string
  /**
   * rowGrouping 병합 셀(span > 1)의 세로 확장 높이. head 셀이 아니면 undefined.
   * 지정되면 컨텐츠를 absolute 로 이 높이만큼 늘려 아래 middle row 들을 덮는다.
   */
  spanHeight?: number
  /** head 셀 배경 (그룹 hover / 선택 반영). head 셀일 때만 넘긴다. */
  headBgClass?: string
  /** 이 셀이 편집 중인지 */
  isEditing: boolean
  /** 검증 에러 — 편집 중인 셀에만 넘긴다 */
  editingError?: string
  onStartEdit: (row: T, col: DataTableV2Column<T>) => void
  onCompleteEdit: (
    col: DataTableV2Column<T>,
    row: T,
    value: T[keyof T]
  ) => void
  onCancelEdit: () => void
  onClearEditError: () => void
}

function DataTableV2CellInner<T extends { id: string | number }>({
  row,
  column,
  width,
  minWidth,
  leftOffset,
  rightOffset,
  isLeftPinned,
  isRightPinned,
  isLeftBoundary,
  isRightBoundary,
  isFirstRightPinned,
  rowHighlightClass,
  spanHeight,
  headBgClass,
  isEditing,
  editingError,
  onStartEdit,
  onCompleteEdit,
  onCancelEdit,
  onClearEditError,
}: DataTableV2CellProps<T>) {
  const isPinned = isLeftPinned || isRightPinned
  const isHead = spanHeight !== undefined

  const outerCls = cn(
    // overflow 는 자르지 않는다. DS Tooltip 이 Portal 을 안 써서 셀 안에 그려지는데,
    // 여기서 overflow-hidden 을 걸면 툴팁까지 잘린다.
    // 옆 칸 침범은 아래 contentCls 의 min-w-0 로 막는다 (자식이 셀 폭에 맞춰 줄어듦).
    "flex min-h-9",
    width !== undefined && "shrink-0",
    // pinned 셀은 sticky 라 스크롤되는 내용을 덮는다 → **불투명 배경 필수**.
    // 선택/hover 는 행의 group / data-state 를 CSS 로 따라가므로 클래스가 고정이다
    // (prop 으로 받으면 값이 바뀔 때마다 memo 가 깨져 그 행의 pinned 셀이 전부 리렌더된다).
    // pinned 셀은 2겹이다.
    //   바깥(이 요소): 불투명 바탕. 스크롤되는 내용을 덮는다.
    //   안쪽(아래 wrapper): 행과 동일한 상태 색 + 사용처 강조색.
    // 안쪽을 in-flow 자식으로 두는 게 핵심이다. 절대배치 자식은 서브픽셀에서 박스와
    // 어긋나 전환 중 경계가 스치고, 음수 z-index 자식은 부모 배경보다 나중에 그려져
    // 강조색을 덮어버린다.
    isPinned && ["sticky z-10", STICKY_CELL_BASE_BG],
    isFirstRightPinned && "ml-auto",
    isLeftBoundary && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    isRightBoundary && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
    // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
    // (그룹 middle rows 의 bg 위에 얹혀야 함)
    isHead && "relative z-[5]"
  )
  const contentCls = cn(
    // 셀은 컬럼 폭을 벗어나지 않는다. v1(<td>)이 쓰던 규칙을 그대로 가져왔다:
    //   break-all + overflow-wrap  — 긴 텍스트를 컬럼 폭에서 줄바꿈 (행 높이가 늘어남)
    //   overflow-hidden            — 그래도 넘치는 내용은 자름 (옆 칸 침범 방지)
    // v2 에 이 둘이 없어서 사용처 코드가 같은데도 텍스트가 옆 컬럼으로 흘렀다.
    //
    // min-w-0 / [&>*]:min-w-0 — flex 자식(사용처가 감싼 요소 포함)이 내용보다 작아질 수
    // 있게 한다. 없으면 말줄임(truncate) 지점이 컬럼 밖으로 밀려 잘린 채 보인다.
    "flex-1 flex items-center min-w-0 [&>*]:min-w-0 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
    "overflow-hidden break-all [overflow-wrap:break-word]",
    alignClass[column.align ?? "left"],
    column.editable && !isEditing && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
  )

  const handleEditableClick = column.editable
    ? (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isEditing) onStartEdit(row, column)
      }
    : undefined

  // 사용처의 cell 렌더러는 여기서 호출한다. 이 컴포넌트가 memo 라서,
  // 행이 리렌더돼도 이 셀의 prop 이 그대로면 렌더러가 다시 실행되지 않는다.
  const cellBody = isEditing ? (
    <DataTableV2EditCell
      row={row}
      column={column}
      error={editingError}
      onComplete={onCompleteEdit}
      onCancel={onCancelEdit}
      onClearError={onClearEditError}
    />
  ) : (
    <div className={contentCls} onClick={handleEditableClick}>
      {column.cell
        ? column.cell(row[column.accessorKey], row)
        : (row[column.accessorKey] as React.ReactNode)}
    </div>
  )

  // pinned 셀의 안쪽 레이어 — 행과 동일한 상태 색 + 강조색.
  // in-flow 로 부모 박스를 그대로 채우므로 서브픽셀 어긋남이 없다.
  const body = isPinned ? (
    <div
      className={cn(
        "flex flex-1 min-w-0 transition-colors",
        ROW_BG_DESCENDANT,
        rowHighlightClass
      )}
    >
      {cellBody}
    </div>
  ) : (
    cellBody
  )

  return (
    <div
      role="gridcell"
      className={outerCls}
      style={{
        width,
        minWidth,
        flex: width === undefined ? "1 1 0" : undefined,
        left: isLeftPinned ? leftOffset : undefined,
        right: isRightPinned ? rightOffset : undefined,
      }}
      {...(column.editable ? { "data-no-row-click": true } : {})}
    >
      {isHead ? (
        // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
        // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
        // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
        <div
          className={cn(
            "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
            headBgClass
          )}
          style={{ height: spanHeight }}
        >
          {body}
        </div>
      ) : (
        body
      )}
    </div>
  )
}

type DataTableV2CellComponent = <T extends { id: string | number }>(
  props: DataTableV2CellProps<T>
) => React.ReactElement | null

/**
 * 데이터 셀 — **행과 별개의 memo 단위**.
 *
 * 행이 memo 최소 단위이면 체크박스 하나만 눌러도 그 행의 셀이 전부 다시 그려진다.
 * 컬럼이 많은 테이블에서 전체 선택 같은 조작은 비용이 급격히 커진다
 * (29컬럼 × 500행 = 14,500 재조정). 셀을 분리하면 실제로 바뀐 셀만 다시 그린다.
 *
 * ⚠️ prop 하나라도 매 렌더 새 값이면 memo 가 통째로 무효가 된다.
 * 행 선택/hover 에 따라 바뀌는 값은 되도록 prop 으로 넘기지 않는다.
 * - pinned 셀 배경: `bg-inherit` 로 행 배경을 CSS 상속 (prop 불필요)
 * - `headBgClass`: rowGrouping head 셀만. 그룹 hover 는 행 단위가 아니라
 *   그룹 단위라 CSS 상속으로 표현할 수 없어 어쩔 수 없이 prop 으로 받는다
 * - `editingError`: 편집 중인 셀에만
 */
export const DataTableV2Cell = React.memo(
  DataTableV2CellInner
) as DataTableV2CellComponent
