import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { DraggableAttributes } from "@dnd-kit/core"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DownIcon, DragHandleIcon, RightIcon, RowDeleteIcon } from "@/icons"
import { DataTableV2Cell } from "./data-table-v2-cell"
import type { DataTableV2Column } from "./types"

interface DataTableV2RowProps<T extends { id: string | number }> {
  row: T
  rowIndex: number
  columns: DataTableV2Column<T>[]
  leftOffsets: number[]
  rightOffsets: number[]
  lastLeftPinnedIdx: number
  firstRightPinnedIdx: number
  totalWidth: number
  /**
   * 행 엘리먼트 등록 콜백 (SDS-49).
   * 세로 위치(top)는 prop 으로 받지 않고 부모가 layout effect 에서 DOM 에 직접 쓴다.
   * 위치를 prop 으로 받으면 위쪽 행의 높이가 바뀔 때마다 이 행이 리렌더된다.
   */
  registerEl: (id: T["id"], el: HTMLElement | null) => void
  // rowGrouping 활성 시에만 필요. hover 상태를 parent state 로 관리해 그룹 head 셀 하이라이트 동기화.
  // 비활성 시엔 undefined 로 넘겨 mouseenter/leave listener 자체를 안 붙임 → hover 시 리렌더 방지.
  onHover?: (id: T["id"] | null) => void
  onHeightChange: (id: T["id"], height: number) => void
  // 행 선택
  selectable: boolean
  isSelected: boolean
  onToggleSelect: (id: T["id"], rowIndex: number, shiftKey: boolean) => void
  checkboxColWidth: number
  // 행 확장
  expandable: boolean
  isExpanded: boolean
  canExpand: boolean
  onToggleExpand: (id: T["id"]) => void
  expandedContent: React.ReactNode
  expandColWidth: number
  /**
   * 스크롤 컨테이너의 가시 영역 너비.
   * 확장 영역을 이 폭으로 sticky 고정해서, 가로 스크롤을 해도 펼친 내용이
   * 항상 화면 안에 보이게 한다 (v1 과 동일한 동작).
   * 0 이면 미측정 상태 → 폭 지정 없이 렌더.
   */
  visibleWidth: number
  // 행 클릭 / className
  onRowClick?: (row: T) => void
  extraClassName?: string
  // 마지막 row 여부 — 외곽 컨테이너 border-b 와 겹쳐 2px 보이는 것 방지 위해 border-b 생략
  isLast: boolean
  // 셀 편집
  // 편집 임시값은 DataTableV2EditCell 로컬 state. 여기엔 "편집 중인 컬럼" 과 에러만 내려온다.
  editingColumnKey: keyof T | null
  editingError?: string
  onStartEdit: (row: T, col: DataTableV2Column<T>) => void
  onCompleteEdit: (
    col: DataTableV2Column<T>,
    row: T,
    value: T[keyof T]
  ) => void
  onCancelEdit: () => void
  onClearEditError: () => void
  // 행 삭제 (rowActions) — checkbox/expand 뒤, 데이터 컬럼 앞에 sticky left 로 배치
  showRowDelete: boolean
  onRowDelete?: (row: T) => void
  rowActionsColWidth: number
  rowActionsColLeftOffset: number
  // 행 순서 변경 (드래그 핸들) — 가장 왼쪽 sticky left: 0
  rowReorderable: boolean
  dragHandleColWidth: number
  // 로우 그룹핑 (셀 병합)
  // 아래 3개 함수는 parent 에서 memoize 된 stable ref. row 는 자기 rowIndex 를 첫 인자로 넣어 호출.
  // (curry 를 parent 에서 inline 으로 하면 매 렌더마다 새 fn ref → React.memo 무효화됨)
  getRowSpan: (rowIndex: number, columnKey: keyof T) => number | undefined
  getRowSpanHeight: (rowIndex: number, columnKey: keyof T) => number | undefined
  getGroupHovered: (rowIndex: number, columnKey: keyof T) => boolean
  // 가상화 (SDS-38): virtualizer.measureElement 를 ref 로 받음. 없으면 무시.
  measureRef?: (el: HTMLElement | null) => void
  // 가상화 (SDS-38): virtualizer 가 measurementsCache 매칭하는 인덱스. `data-index` 로 렌더.
  dataIndex?: number
  // ARIA (SDS-38): grid row 위치 (1-indexed, header 포함)
  ariaRowIndex: number
}

/**
 * dnd-kit `useSortable` 결과 중 Row 본문이 실제로 쓰는 것만 추린 바인딩.
 * rowReorderable 이 아닐 때는 `NO_SORTABLE` (빈 객체) 이 주입된다.
 */
interface RowSortableBindings {
  setNodeRef?: (el: HTMLElement | null) => void
  setActivatorNodeRef?: (el: HTMLElement | null) => void
  listeners?: Record<string, unknown>
  attributes?: DraggableAttributes
  transform?: string
  transition?: string
  isDragging: boolean
}

function DataTableV2RowInner<T extends { id: string | number }>({
  row,
  rowIndex,
  columns,
  leftOffsets,
  rightOffsets,
  lastLeftPinnedIdx,
  firstRightPinnedIdx,
  totalWidth,
  registerEl,
  onHover,
  onHeightChange,
  selectable,
  isSelected,
  onToggleSelect,
  checkboxColWidth,
  expandable,
  isExpanded,
  canExpand,
  onToggleExpand,
  expandedContent,
  expandColWidth,
  visibleWidth,
  onRowClick,
  extraClassName,
  editingColumnKey,
  editingError,
  onStartEdit,
  onCompleteEdit,
  onCancelEdit,
  onClearEditError,
  showRowDelete,
  onRowDelete,
  rowActionsColWidth,
  rowActionsColLeftOffset,
  rowReorderable,
  dragHandleColWidth,
  isLast,
  getRowSpan,
  getRowSpanHeight,
  getGroupHovered,
  measureRef,
  dataIndex,
  ariaRowIndex,
  sortable,
}: DataTableV2RowProps<T> & { sortable: RowSortableBindings }) {
  const rowRef = React.useRef<HTMLDivElement | null>(null)

  // 행 순서 변경 (드래그) 바인딩은 prop 으로 주입받는다. useSortable 을 이 컴포넌트에서
  // 직접 호출하면 rowReorderable 이 false 여도 dnd-kit context 를 구독하게 되어,
  // **컬럼 재정렬 드래그 중에 모든 행이 리렌더** 된다 (context 변경은 React.memo 로 못 막음).
  const dndTransform = sortable.transform
  const dndTransition = sortable.transition
  const isDragging = sortable.isDragging

  React.useLayoutEffect(() => {
    const el = rowRef.current
    if (!el) return
    const report = () => onHeightChange(row.id, el.offsetHeight)
    report()
    const observer = new ResizeObserver(report)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row.id, isExpanded])

  // Row bg — 기본 상태 + hover 는 CSS `:hover` (row inner self) + `group-hover:` (sticky 셀들) 둘 다.
  // Row inner 는 자체 hover → `hover:`, sticky 셀은 부모 (.group) hover 반응 → `group-hover:`.
  // 둘 다 적용하면 서로 방해 안 하고 각자 필요한 곳에서 발화.
  // (state 기반이면 hover 마다 parent 리렌더 → 모든 row memo 무효화. CSS 는 리렌더 없음.)
  const bgClass = isSelected
    ? "bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950 group-hover:bg-blue-100 dark:group-hover:bg-blue-950"
    : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-800"

  const shiftKeyRef = React.useRef(false)

  const handleRowClick = (e: React.MouseEvent) => {
    // 컨트롤 셀 / 상호작용 요소 클릭은 rowClick 트리거하지 않음
    if ((e.target as HTMLElement).closest("[data-no-row-click]")) return
    onRowClick?.(row)
  }

  // 행 위치: `top` 으로 배치 (dnd-kit sortable 이 layout 좌표 기반으로 sibling shift/collision 을
  // 계산하는데, transform 으로만 배치하면 모든 행의 layout 좌표가 0 이라 dnd-kit 이 실시간 shift 를
  // 정상적으로 못 함. `top` 을 쓰면 각 행의 offsetTop 이 서로 다르게 잡혀서 dnd-kit 표준 경로대로 동작).
  // transform 은 dnd-kit 이 드래그/시프트에 전용으로 사용.
  const setRefs = React.useCallback(
    (el: HTMLDivElement | null) => {
      rowRef.current = el
      sortable.setNodeRef?.(el)
      if (measureRef) measureRef(el)
      registerEl(row.id, el)
    },
    [sortable, measureRef, registerEl, row.id]
  )

  return (
    <div
      ref={setRefs}
      role="row"
      data-index={dataIndex}
      aria-rowindex={ariaRowIndex}
      className={cn(
        "absolute left-0 right-0 flex flex-col",
        isDragging && "z-30"
      )}
      style={{
        minWidth: totalWidth,
        // top 은 부모가 layout effect 로 직접 쓴다 (위 registerEl 주석 참고).
        // React style 객체에 top 을 두지 않으므로 React 가 값을 덮어쓰지 않는다.
        transform: dndTransform,
        transition: dndTransition,
        opacity: isDragging ? 0.6 : undefined,
      }}
    >
      <div
        className={cn(
          // border-b 를 row 자체에 두어서 우측 empty 영역 (셀 미커버) 에도 하단 line 이 이어지게 함.
          // 마지막 row 는 외곽 컨테이너 border-bottom 과 겹쳐 2px 로 보이므로 생략.
          // rowGrouping 병합 셀 위엔 head 셀의 absolute wrapper (opaque bg) 가 border 를 자동으로 가림 → 별도 middle row 스킵 불필요.
          // `group` 클래스 — sticky 셀들이 `group-hover:` 로 row hover 반응 (state 없이 CSS 만)
          "group flex transition-colors",
          !isLast && "border-b border-slate-200 dark:border-slate-700",
          bgClass,
          onRowClick && "cursor-pointer",
          extraClassName
        )}
        onMouseEnter={onHover ? () => onHover(row.id) : undefined}
        onMouseLeave={onHover ? () => onHover(null) : undefined}
        onClick={onRowClick ? handleRowClick : undefined}
      >
        {rowReorderable && (
          <div
            role="gridcell"
            data-no-row-click
            className={cn(
              "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
              bgClass
            )}
            style={{ width: dragHandleColWidth, left: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={sortable.setActivatorNodeRef}
              className="flex h-9 w-8 items-center justify-center cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="행 순서 변경"
              {...(sortable.listeners ?? {})}
              {...(sortable.attributes ?? {})}
            >
              <DragHandleIcon size={16} />
            </div>
          </div>
        )}
        {selectable && (
          <div
            role="gridcell"
            data-no-row-click
            className={cn(
              "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
              bgClass
            )}
            style={{
              width: checkboxColWidth,
              left: rowReorderable ? dragHandleColWidth : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={isSelected}
              onClick={(e) => {
                shiftKeyRef.current = (e as React.MouseEvent).shiftKey
              }}
              onCheckedChange={() => {
                onToggleSelect(row.id, rowIndex, shiftKeyRef.current)
                shiftKeyRef.current = false
              }}
              aria-label={`행 ${row.id} 선택`}
            />
          </div>
        )}
        {expandable && (
          <div
            role="gridcell"
            data-no-row-click
            className={cn(
              "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
              bgClass
            )}
            style={{
              width: expandColWidth,
              left:
                (rowReorderable ? dragHandleColWidth : 0) +
                (selectable ? checkboxColWidth : 0),
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {canExpand && (
              <button
                type="button"
                onClick={() => onToggleExpand(row.id)}
                className="flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label={isExpanded ? "행 접기" : "행 펼치기"}
                aria-expanded={isExpanded}
              >
                {isExpanded ? <DownIcon size={24} /> : <RightIcon size={24} />}
              </button>
            )}
          </div>
        )}
        {showRowDelete && (
          <div
            role="gridcell"
            data-no-row-click
            className={cn(
              "shrink-0 sticky z-10 flex items-center justify-center min-h-9 transition-colors",
              bgClass
            )}
            style={{ width: rowActionsColWidth, left: rowActionsColLeftOffset }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onRowDelete?.(row)}
              className="flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="행 삭제"
            >
              <RowDeleteIcon size={20} />
            </button>
          </div>
        )}
        {columns.map((col, i) => {
          const colId = col.id ?? String(col.accessorKey)
          const width = typeof col.width === "number" ? col.width : undefined
          const minWidth = typeof col.minWidth === "number" ? col.minWidth : undefined
          const isLeft = col.pinned === "left"
          const isRight = col.pinned === "right"
          const isPinned = isLeft || isRight
          // shadow 는 CSS `group-data-[scrolled-*=true]/scroll:` 로 반응 → 여기선 column 위치만 판단.
          const isFirstRightPinned = i === firstRightPinnedIdx
          // rowGrouping: span 결정
          // - undefined 또는 1 → 정상 셀
          // - 0 → middle placeholder (flex 폭만, 컨텐츠/border 없음)
          // - > 1 → head 셀. 컨텐츠를 세로 확장 (position:absolute + height=spanHeight)
          const span = getRowSpan(rowIndex, col.accessorKey)
          if (span === 0) {
            return (
              <div
                key={colId}
                aria-hidden
                className={cn(
                  width !== undefined && "shrink-0",
                  isPinned && "sticky z-10",
                  isFirstRightPinned && "ml-auto"
                )}
                style={{
                  width,
                  minWidth,
                  flex: width === undefined ? "1 1 0" : undefined,
                  left: isLeft ? leftOffsets[i] : undefined,
                  right: isRight ? rightOffsets[i] : undefined,
                }}
              />
            )
          }
          const spanHeight =
            span !== undefined && span > 1
              ? getRowSpanHeight(rowIndex, col.accessorKey)
              : undefined

          // 선택/hover 에 따라 바뀌는 배경은 **그 값이 꼭 필요한 셀에만** 넘긴다.
          // 모든 셀에 넘기면 체크박스 한 번에 그 행의 셀이 전부 리렌더된다.
          // - pinned 셀: sticky 라 자체 배경 필요
          // - head 셀: 그룹 hover / 선택 반영 필요.
          //   (head row 가 hover 안 됐어도 middle row hover 시 head 셀은 hover 표시돼야 하므로
          //    row 자체의 bgClass 와 분리한다)
          const headBgClass =
            spanHeight === undefined
              ? undefined
              : getGroupHovered(rowIndex, col.accessorKey)
                ? "bg-slate-100 dark:bg-slate-800"
                : isSelected
                  ? "bg-blue-50 dark:bg-blue-900"
                  : "bg-white dark:bg-slate-900"

          const isCellEditing = editingColumnKey === col.accessorKey

          return (
            <DataTableV2Cell
              key={colId}
              row={row}
              column={col}
              width={width}
              minWidth={minWidth}
              leftOffset={isLeft ? leftOffsets[i] : undefined}
              rightOffset={isRight ? rightOffsets[i] : undefined}
              isLeftPinned={isLeft}
              isRightPinned={isRight}
              isLeftBoundary={i === lastLeftPinnedIdx}
              isRightBoundary={i === firstRightPinnedIdx}
              isFirstRightPinned={isFirstRightPinned}
              pinnedBgClass={isPinned ? bgClass : undefined}
              spanHeight={spanHeight}
              headBgClass={headBgClass}
              isEditing={isCellEditing}
              editingError={isCellEditing ? editingError : undefined}
              onStartEdit={onStartEdit}
              onCompleteEdit={onCompleteEdit}
              onCancelEdit={onCancelEdit}
              onClearEditError={onClearEditError}
            />
          )
        })}
      </div>
      {isExpanded && expandedContent && (
        <div
          data-no-row-click
          className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700"
        >
          {/* 가로 스크롤을 해도 펼친 내용이 가시 영역에 머물도록 sticky 고정.
              폭을 가시 영역에 맞추고, 내용이 넘치면 확장 영역이 자체 가로 스크롤을 갖는다.
              (없으면 테이블 전체 폭을 따라가서 펼친 내용이 화면 밖으로 밀려난다) */}
          <div
            className="sticky left-0 overflow-x-auto"
            style={visibleWidth ? { width: visibleWidth, maxWidth: "100%" } : undefined}
          >
            {expandedContent}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * rowReorderable 일 때만 렌더되는 래퍼. `useSortable` 호출을 여기로 격리한다.
 *
 * Row 본문에서 직접 호출하면 rowReorderable 이 false 여도 dnd-kit context 를 구독하게 되고,
 * columnReorderable 로 DndContext 가 떠 있는 상태에서 **컬럼을 드래그하는 동안 모든 행이
 * 리렌더** 된다 (context 변경은 props 비교인 React.memo 로 막을 수 없음).
 */
function DataTableV2SortableRow<T extends { id: string | number }>(
  props: DataTableV2RowProps<T>
) {
  const { setNodeRef, setActivatorNodeRef, listeners, attributes, transform, transition, isDragging } =
    useSortable({ id: `row-${props.row.id}` })

  const sortable = React.useMemo<RowSortableBindings>(
    () => ({
      setNodeRef,
      setActivatorNodeRef,
      listeners,
      attributes,
      transform: CSS.Transform.toString(transform) ?? undefined,
      transition,
      isDragging,
    }),
    [setNodeRef, setActivatorNodeRef, listeners, attributes, transform, transition, isDragging]
  )

  return <DataTableV2RowInner {...props} sortable={sortable} />
}

/** rowReorderable 이 아닐 때 쓰는 빈 바인딩 (stable ref — 매번 새 객체면 memo 무효화) */
const NO_SORTABLE: RowSortableBindings = { isDragging: false }

function DataTableV2RowDispatch<T extends { id: string | number }>(
  props: DataTableV2RowProps<T>
) {
  return props.rowReorderable ? (
    <DataTableV2SortableRow {...props} />
  ) : (
    <DataTableV2RowInner {...props} sortable={NO_SORTABLE} />
  )
}

type DataTableV2RowComponent = <T extends { id: string | number }>(
  props: DataTableV2RowProps<T>
) => React.ReactElement | null

export const DataTableV2Row = React.memo(DataTableV2RowDispatch) as DataTableV2RowComponent
