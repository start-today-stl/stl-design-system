import * as React from "react"
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DownIcon, RightIcon } from "@/icons"
import { DataTableV2ColumnSeparator } from "./data-table-v2-column-separator"
import { DataTableV2FilterCell } from "./data-table-v2-filter-cell"
import { DataTableV2SortableHeaderCell } from "./data-table-v2-sortable-header-cell"
import {
  CHECKBOX_COL_WIDTH,
  DEFAULT_COL_WIDTH,
  DRAG_HANDLE_COL_WIDTH,
  EXPAND_COL_WIDTH,
  ROW_ACTIONS_WIDTH,
  alignClass,
} from "./constants"
import type {
  DataTableV2Column,
  HeaderGroup,
  SortDirection,
} from "./types"

/** 헤더 그룹 행의 셀 하나. group = 그룹 헤더, placeholder = 그룹 없는 컬럼 자리 */
export type HeaderGroupCell<T> =
  | { kind: "group"; key: string; width: number; group: HeaderGroup<T> }
  | { kind: "placeholder"; key: string; col: DataTableV2Column<T> }

/** 컬럼 인덱스를 함께 들고 다니는 pinned 컬럼 (offset 조회에 원본 인덱스 필요) */
export interface PinnedColumnRef<T> {
  c: DataTableV2Column<T>
  i: number
}

/** 정렬 인디케이터 — 정렬 상태가 바뀐 컬럼만 다시 그리도록 memo */
const SortArrow = React.memo(function SortArrow({
  direction,
  active,
}: {
  direction: "up" | "down"
  active: boolean
}) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "transition-colors",
        active ? "text-blue-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-500",
        direction === "down" && "rotate-180"
      )}
    >
      <path d="M4 0L8 5H0L4 0Z" fill="currentColor" />
    </svg>
  )
})

export interface DataTableV2HeaderProps<T> {
  // ── 컬럼 ──────────────────────────────────────────────────────────
  /** 리사이즈/재정렬이 반영된 최종 컬럼 배열 */
  columns: DataTableV2Column<T>[]
  hasFlexColumn: boolean

  // ── 헤더 그룹 ─────────────────────────────────────────────────────
  headerGroupCells: HeaderGroupCell<T>[] | null
  hasGroups: boolean
  headerRowCount: number
  /** 첫 그룹 셀 앞에 컨트롤/좌측 pinned 셀이 있는지 (좌측 구분선 표시 여부) */
  hasPrecedingHeaderCells: boolean

  // ── pinned ────────────────────────────────────────────────────────
  leftPinnedCols: PinnedColumnRef<T>[]
  rightPinnedCols: PinnedColumnRef<T>[]
  lastLeftPinnedIdx: number
  firstRightPinnedIdx: number
  leftOffsets: number[]
  rightOffsets: number[]

  // ── 정렬 ──────────────────────────────────────────────────────────
  getSortInfo: (key: keyof T) => {
    direction: SortDirection | undefined
    priority: number | undefined
  }
  onSort: (key: keyof T) => void

  // ── 필터 ──────────────────────────────────────────────────────────
  /**
   * memo 무효화 전용. 아래 getColumnFilter / hasActiveFilter 는 ref 로 흡수된
   * stable 콜백이라 필터가 바뀌어도 함수 identity 가 그대로다.
   * 이 값을 prop 으로 받지 않으면 필터를 눌러도 헤더가 갱신되지 않는다.
   */
  filterState: Record<string, unknown>
  getColumnFilter: (columnKey: string) => unknown
  hasActiveFilter: (columnKey: string) => boolean
  onColumnFilterChange: (columnKey: string, value: unknown) => void

  // ── 리사이즈 ──────────────────────────────────────────────────────
  resizable: boolean
  resizingKey: keyof T | null
  onResizeStart: (e: React.MouseEvent, column: unknown) => void

  // ── 컬럼 재정렬 ───────────────────────────────────────────────────
  columnReorderable: boolean
  reorderableIds: string[]

  // ── 좌측 컨트롤 컬럼 ──────────────────────────────────────────────
  rowReorderable: boolean
  selectable: boolean
  allSelected: boolean
  someSelected: boolean
  onToggleAll: () => void
  hasExpandable: boolean
  showExpandAll: boolean
  allExpanded: boolean
  onToggleExpandAll: () => void
  showRowDelete: boolean
  dragHandleColsWidth: number
  rowActionsColLeftOffset: number

  /** 헤더 컨테이너 배경 (sticky 시 바디가 비쳐 보이지 않도록) */
  headerBg: string
}

function DataTableV2HeaderInner<T extends { id: string | number }>({
  columns,
  hasFlexColumn,
  headerGroupCells,
  hasGroups,
  headerRowCount,
  hasPrecedingHeaderCells,
  leftPinnedCols,
  rightPinnedCols,
  lastLeftPinnedIdx,
  firstRightPinnedIdx,
  leftOffsets,
  rightOffsets,
  getSortInfo,
  onSort,
  filterState,
  getColumnFilter,
  hasActiveFilter,
  onColumnFilterChange,
  resizable,
  resizingKey,
  onResizeStart,
  columnReorderable,
  reorderableIds,
  rowReorderable,
  selectable,
  allSelected,
  someSelected,
  onToggleAll,
  hasExpandable,
  showExpandAll,
  allExpanded,
  onToggleExpandAll,
  showRowDelete,
  dragHandleColsWidth,
  rowActionsColLeftOffset,
  headerBg,
}: DataTableV2HeaderProps<T>) {
  // filterState 는 memo 무효화 키로만 쓴다 (위 prop 주석 참고).
  // 실제 값 조회는 stable 콜백인 getColumnFilter / hasActiveFilter 로 한다.
  void filterState

  const renderHeaderCell = (col: DataTableV2Column<T>, i: number) => {
    const colId = col.id ?? String(col.accessorKey)
    const info = getSortInfo(col.accessorKey)
    const width = typeof col.width === "number" ? col.width : undefined
    const minWidth = typeof col.minWidth === "number" ? col.minWidth : undefined
    const isLeft = col.pinned === "left"
    const isRight = col.pinned === "right"
    const isPinned = isLeft || isRight
    // shadow 는 CSS `group-data-[scrolled-*=true]/scroll:` 로 반응 → 여기선 column 위치만 판단.
    const isLeftBoundary = i === lastLeftPinnedIdx
    const isRightBoundary = i === firstRightPinnedIdx
    const isFirstRightPinned = i === firstRightPinnedIdx
    const isDraggable = columnReorderable && !isPinned
    const isResizingThis = resizingKey === col.accessorKey
    const isLastColumn = i === columns.length - 1

    // Outer: 순수 레이아웃/포지셔닝. text 스타일은 content container 에.
    // 모든 셀에 bg 부여 (pinned 여부 무관) → 가로 스크롤 우측 끝에서 마지막 컬럼 bg 로 자연 커버
    // (right pinned 없는 케이스에서 wrapper 우측 흰 gap 발생 방지)
    const outerCls = cn(
      "relative flex min-h-9",
      width !== undefined && "shrink-0",
      isPinned && "sticky z-20",
      headerBg,
      isLeftBoundary && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      isRightBoundary && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
      col.sortable && "select-none",
      isFirstRightPinned && "ml-auto"
    )
    const style: React.CSSProperties = {
      width,
      minWidth,
      flex: width === undefined ? "1 1 0" : undefined,
      left: isLeft ? leftOffsets[i] : undefined,
      right: isRight ? rightOffsets[i] : undefined,
    }

    // Content container 는 3 슬롯 (헤더명+정렬 / 필터 / 미래 확장) 구조.
    // alignClass 는 슬롯 1 내부에만 적용해서 필터 아이콘 위치에 영향 안 주게 함.
    const contentBody = col.sortable ? (
      <button
        type="button"
        className={cn(
          "flex w-full min-w-0 items-center gap-1 cursor-pointer",
          // 우측 정렬 컬럼은 sort 인디케이터를 헤더명 좌측에 두는 게 관행. flex-row-reverse 로 순서 반전.
          col.align === "right"
            ? "flex-row-reverse justify-start"
            : alignClass[col.align ?? "left"]
        )}
        onClick={() => onSort(col.accessorKey)}
      >
        <span className="min-w-0 truncate">{col.header}</span>
        <span className="flex shrink-0 items-center gap-0.5">
          <span className="flex flex-col gap-0.5">
            <SortArrow direction="up" active={info.direction === "asc"} />
            <SortArrow direction="down" active={info.direction === "desc"} />
          </span>
          {info.priority !== undefined && (
            <span className="text-[9px] font-medium text-blue-600 dark:text-blue-400 leading-none">
              {info.priority}
            </span>
          )}
        </span>
      </button>
    ) : (
      <span className="min-w-0 truncate">{col.header}</span>
    )

    const columnKey = String(col.accessorKey)
    const filterCell = col.filter ? (
      <DataTableV2FilterCell
        column={col}
        filter={col.filter}
        value={getColumnFilter(columnKey)}
        active={hasActiveFilter(columnKey)}
        onChange={onColumnFilterChange}
        columnKey={columnKey}
      />
    ) : null

    // 오른쪽 정렬 컬럼(주로 숫자)은 데이터 값이 우측 끝에 몰리므로 필터 아이콘을 좌측에 배치.
    // 정렬 화살표의 flex-row-reverse 처리와 같은 UX 원칙 (AG Grid 등 표준).
    const contentInner = (
      <div
        className={cn(
          "flex-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 min-w-0",
          col.align === "right" && "flex-row-reverse"
        )}
      >
        <div
          className={cn(
            "flex-1 flex items-center gap-1 min-w-0 overflow-hidden",
            alignClass[col.align ?? "left"]
          )}
        >
          {contentBody}
        </div>
        {filterCell}
      </div>
    )

    const separator = !isLastColumn && (
      <DataTableV2ColumnSeparator
        resizable={resizable}
        isResizing={isResizingThis}
        onResizeStart={onResizeStart}
        column={col}
      />
    )

    const ariaSort: "ascending" | "descending" | "none" | undefined = col.sortable
      ? info.direction === "asc"
        ? "ascending"
        : info.direction === "desc"
          ? "descending"
          : "none"
      : undefined

    if (isDraggable) {
      return (
        <DataTableV2SortableHeaderCell
          key={colId}
          id={String(col.accessorKey)}
          className={outerCls}
          style={style}
          dataColumnKey={String(col.accessorKey)}
          ariaSort={ariaSort}
        >
          {contentInner}
          {separator}
        </DataTableV2SortableHeaderCell>
      )
    }

    return (
      <div
        key={colId}
        role="columnheader"
        data-column-key={String(col.accessorKey)}
        className={outerCls}
        style={style}
        aria-sort={ariaSort}
      >
        {contentInner}
        {separator}
      </div>
    )
  }

  // 그룹 행에서 pinned 컬럼 자리를 채우기 위한 sticky placeholder 렌더
  const renderPinnedPlaceholder = (col: DataTableV2Column<T>, i: number) => {
    const width = typeof col.width === "number" ? col.width : DEFAULT_COL_WIDTH
    const isLeft = col.pinned === "left"
    // shadow 는 CSS `group-data-[scrolled-*=true]/scroll:` 로 반응 → 여기선 column 위치만 판단.
    const isLeftBoundary = i === lastLeftPinnedIdx
    const isRightBoundary = i === firstRightPinnedIdx
    const isFirstRightPinned = i === firstRightPinnedIdx
    return (
      <div
        key={`pinned-placeholder-${col.id ?? String(col.accessorKey)}`}
        className={cn(
          "shrink-0 sticky z-20",
          headerBg,
          isFirstRightPinned && "ml-auto",
          isLeftBoundary && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
          isRightBoundary && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
        )}
        style={{
          width,
          left: isLeft ? leftOffsets[i] : undefined,
          right: !isLeft ? rightOffsets[i] : undefined,
        }}
      />
    )
  }

  // Control 헤더 셀 (드래그 핸들 / 체크박스 / 확장) — sticky left, 항상 좌측 pinned 컬럼 앞에 위치
  const renderControlHeaderCells = () => {
    const cells: React.ReactNode[] = []
    if (rowReorderable) {
      cells.push(
        <div
          key="ctrl-header-drag-handle"
          role="columnheader"
          className={cn("shrink-0 sticky z-20 min-h-9", headerBg)}
          style={{ width: DRAG_HANDLE_COL_WIDTH, left: 0 }}
          aria-label="행 순서 변경"
        >
          <span className="sr-only">행 순서 변경</span>
        </div>
      )
    }
    if (selectable) {
      cells.push(
        <div
          key="ctrl-header-select"
          role="columnheader"
          className={cn("shrink-0 sticky z-20 flex items-center justify-center min-h-9", headerBg)}
          style={{
            width: CHECKBOX_COL_WIDTH,
            left: dragHandleColsWidth,
          }}
        >
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onCheckedChange={() => onToggleAll()}
            aria-label="전체 선택"
          />
        </div>
      )
    }
    if (hasExpandable) {
      cells.push(
        <div
          key="ctrl-header-expand"
          role="columnheader"
          className={cn("shrink-0 sticky z-20 flex items-center justify-center min-h-9", headerBg)}
          style={{
            width: EXPAND_COL_WIDTH,
            left: dragHandleColsWidth + (selectable ? CHECKBOX_COL_WIDTH : 0),
          }}
        >
          {showExpandAll ? (
            <button
              type="button"
              onClick={onToggleExpandAll}
              className="flex h-9 w-10 items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              aria-label={allExpanded ? "모두 접기" : "모두 펼치기"}
            >
              {allExpanded ? <DownIcon size={24} /> : <RightIcon size={24} />}
            </button>
          ) : (
            // 전체 펼치기 버튼을 숨겨도 columnheader 는 남으므로 읽을 텍스트가 있어야 한다.
            // (비어 있으면 axe 의 empty-table-header 위반)
            <span className="sr-only">행 펼치기</span>
          )}
        </div>
      )
    }
    return cells
  }

  // 행 삭제 컬럼 헤더 셀 — sticky left (checkbox/expand 뒤에 배치)
  const renderDeleteControlHeaderCell = () => {
    if (!showRowDelete) return null
    return (
      <div
        key="ctrl-header-delete"
        role="columnheader"
        className={cn(
          "shrink-0 sticky z-20 flex items-center justify-center min-h-9",
          headerBg
        )}
        style={{ width: ROW_ACTIONS_WIDTH, left: rowActionsColLeftOffset }}
        aria-label="행 삭제"
      >
        <span className="sr-only">행 삭제</span>
      </div>
    )
  }

  const renderDeleteControlHeaderPlaceholder = () => {
    if (!showRowDelete) return null
    return (
      <div
        key="ctrl-ph-delete"
        className={cn("shrink-0 sticky z-20 min-h-9", headerBg)}
        style={{ width: ROW_ACTIONS_WIDTH, left: rowActionsColLeftOffset }}
      />
    )
  }

  // Control 헤더 placeholder (그룹 행에서 자리 확보용, 내용 비어있음)
  const renderControlHeaderPlaceholders = () => {
    const cells: React.ReactNode[] = []
    if (rowReorderable) {
      cells.push(
        <div
          key="ctrl-ph-drag-handle"
          className={cn("shrink-0 sticky z-20 min-h-9", headerBg)}
          style={{ width: DRAG_HANDLE_COL_WIDTH, left: 0 }}
        />
      )
    }
    if (selectable) {
      cells.push(
        <div
          key="ctrl-ph-select"
          className={cn("shrink-0 sticky z-20 min-h-9", headerBg)}
          style={{ width: CHECKBOX_COL_WIDTH, left: dragHandleColsWidth }}
        />
      )
    }
    if (hasExpandable) {
      cells.push(
        <div
          key="ctrl-ph-expand"
          className={cn("shrink-0 sticky z-20 min-h-9", headerBg)}
          style={{
            width: EXPAND_COL_WIDTH,
            left: dragHandleColsWidth + (selectable ? CHECKBOX_COL_WIDTH : 0),
          }}
        />
      )
    }
    return cells
  }

  const columnHeaderRow = (
    <div role="row" aria-rowindex={headerRowCount} className="flex">
      {renderControlHeaderCells()}
      {renderDeleteControlHeaderCell()}
      {columns.map((col, i) => renderHeaderCell(col, i))}
      {firstRightPinnedIdx === -1 && !hasFlexColumn && (
        <div aria-hidden className="flex-1 min-h-9" />
      )}
    </div>
  )

  return (
    <div
      className={cn(
        "sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700",
        headerBg
      )}
    >
      {hasGroups && headerGroupCells && (
        <div
          role="row"
          aria-rowindex={1}
          className="flex border-b border-slate-200 dark:border-slate-700"
        >
          {renderControlHeaderPlaceholders()}
          {renderDeleteControlHeaderPlaceholder()}
          {leftPinnedCols.map(({ c, i }) => renderPinnedPlaceholder(c, i))}
          {headerGroupCells.map((cell, idx) => {
            if (cell.kind === "group") {
              // 그룹의 시작/끝 경계마다 구분선을 넣는다.
              // - 좌측: 각 그룹 셀이 직접 그림. 단 행 맨 앞(앞에 컨트롤/pinned 셀도 없음)이면
              //   테이블 좌측 테두리와 겹치므로 생략
              // - 우측: 다음이 그룹이면 그쪽 좌측 구분선과 같은 자리라 생략.
              //   다음이 비그룹 컬럼일 때만 그려서 그룹이 어디서 끝나는지 표시.
              //   행의 마지막 셀이면 우측 테두리와 겹치므로 생략
              const nextCell = headerGroupCells[idx + 1]
              const showLeft = idx > 0 || hasPrecedingHeaderCells
              const showRight =
                nextCell !== undefined && nextCell.kind !== "group"
              return (
                <div
                  key={cell.key}
                  role="columnheader"
                  className="relative flex min-h-9 shrink-0"
                  style={{ width: cell.width }}
                >
                  {showLeft && <DataTableV2ColumnSeparator side="left" />}
                  <div
                    className={cn(
                      "flex-1 flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                      alignClass[cell.group.align ?? "center"]
                    )}
                  >
                    {cell.group.header}
                  </div>
                  {showRight && <DataTableV2ColumnSeparator />}
                </div>
              )
            }
            const col = cell.col
            const width = typeof col.width === "number" ? col.width : undefined
            const minWidth =
              typeof col.minWidth === "number" ? col.minWidth : undefined
            return (
              <div
                key={cell.key}
                className={cn(
                  "min-h-9",
                  width === undefined ? "flex-1" : "shrink-0"
                )}
                style={{ width, minWidth }}
              />
            )
          })}
          {rightPinnedCols.map(({ c, i }) => renderPinnedPlaceholder(c, i))}
        </div>
      )}
      {columnReorderable ? (
        <SortableContext
          items={reorderableIds}
          strategy={horizontalListSortingStrategy}
        >
          {columnHeaderRow}
        </SortableContext>
      ) : (
        columnHeaderRow
      )}
    </div>
  )
}

type DataTableV2HeaderComponent = <T extends { id: string | number }>(
  props: DataTableV2HeaderProps<T>
) => React.ReactElement | null

/**
 * 헤더 행(그룹 행 + 컬럼 행)을 **독립 렌더 단위**로 분리한 컴포넌트.
 *
 * 가상화가 켜지면 스크롤할 때마다 DataTableV2 가 리렌더된다 (새 행을 그려야 하므로).
 * 헤더가 본체 안에 인라인 JSX 로 있으면 그때마다 헤더 전체가 다시 그려진다.
 * memo 로 감싸서 헤더가 실제로 의존하는 값이 바뀔 때만 다시 그리게 한다 (SDS-47).
 *
 * ⚠️ 헤더가 쓰는 값은 **반드시 prop 으로 받는다.** 클로저로 끌어다 쓰면
 * memo 가 변경을 감지하지 못해 "필터를 눌렀는데 헤더가 안 바뀌는" 식으로 조용히 틀어진다.
 * 특히 ref 로 흡수된 stable 콜백(getColumnFilter 등)은 값이 바뀌어도 identity 가
 * 그대로이므로, 대응하는 상태값(filterState)을 따로 prop 으로 받아야 한다.
 */
export const DataTableV2Header = React.memo(
  DataTableV2HeaderInner
) as DataTableV2HeaderComponent
