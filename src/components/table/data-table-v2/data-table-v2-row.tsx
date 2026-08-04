import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DownIcon, DragHandleIcon, RightIcon, RowDeleteIcon } from "@/icons"
import { DataTableV2DefaultEdit } from "./data-table-v2-default-edit"
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
  translateY: number
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
  // 행 클릭 / className
  onRowClick?: (row: T) => void
  extraClassName?: string
  // 마지막 row 여부 — 외곽 컨테이너 border-b 와 겹쳐 2px 보이는 것 방지 위해 border-b 생략
  isLast: boolean
  // 셀 편집
  editingColumnKey: keyof T | null
  editingState: { editValue: T[keyof T]; error?: string } | null
  onStartEdit: (row: T, col: DataTableV2Column<T>) => void
  onChangeEditValue: (value: T[keyof T]) => void
  onCompleteEdit: (col: DataTableV2Column<T>, row: T) => void
  onCancelEdit: () => void
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

const alignClass = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
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
  translateY,
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
  onRowClick,
  extraClassName,
  editingColumnKey,
  editingState,
  onStartEdit,
  onChangeEditValue,
  onCompleteEdit,
  onCancelEdit,
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
}: DataTableV2RowProps<T>) {
  const rowRef = React.useRef<HTMLDivElement | null>(null)

  // 행 순서 변경 (드래그) — rowReorderable 일 때만 활성. 활성화 노드(핸들)만 드래그 트리거.
  // useSortable 은 rowReorderable 여부와 무관하게 항상 호출 (Rules of Hooks). id 만 조건부 매칭.
  const sortable = useSortable({ id: `row-${row.id}` })
  const dndTransform = rowReorderable
    ? CSS.Transform.toString(sortable.transform)
    : undefined
  const dndTransition = rowReorderable ? sortable.transition : undefined
  const isDragging = rowReorderable && sortable.isDragging

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
      if (rowReorderable) sortable.setNodeRef(el)
      if (measureRef) measureRef(el)
    },
    [rowReorderable, sortable, measureRef]
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
        top: Math.round(translateY),
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
              {...sortable.listeners}
              {...sortable.attributes}
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
          const value = row[col.accessorKey]
          const rendered = col.cell ? col.cell(value, row) : (value as React.ReactNode)
          const width = typeof col.width === "number" ? col.width : undefined
          const minWidth = typeof col.minWidth === "number" ? col.minWidth : undefined
          const isLeft = col.pinned === "left"
          const isRight = col.pinned === "right"
          const isPinned = isLeft || isRight
          // shadow 는 CSS `group-data-[scrolled-*=true]/scroll:` 로 반응 → 여기선 column 위치만 판단.
          const isLeftBoundary = i === lastLeftPinnedIdx
          const isRightBoundary = i === firstRightPinnedIdx
          const isFirstRightPinned = i === firstRightPinnedIdx
          const isCellEditing =
            !!editingState && editingColumnKey === col.accessorKey
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
          const spanHeight = span !== undefined && span > 1 ? getRowSpanHeight(rowIndex, col.accessorKey) : undefined
          const isHead = spanHeight !== undefined
          const outerCls = cn(
            "flex min-h-9",
            width !== undefined && "shrink-0",
            isPinned && "sticky z-10 transition-colors",
            isPinned && bgClass,
            isFirstRightPinned && "ml-auto",
            isLeftBoundary && "group-data-[scrolled-left=true]/scroll:shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
            isRightBoundary && "group-data-[scrolled-right=true]/scroll:shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]",
            // head 셀: 컨텐츠를 absolute 로 세로 확장하기 위해 relative + z-index 상승
            // (그룹 middle rows 의 bg 위에 얹혀야 함)
            isHead && "relative z-[5]"
          )
          const contentCls = cn(
            "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
            alignClass[col.align ?? "left"],
            col.editable && !isCellEditing && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
          )
          const EditComp = col.editComponent ?? DataTableV2DefaultEdit
          const handleEditableClick = col.editable
            ? (e: React.MouseEvent) => {
                e.stopPropagation()
                if (!isCellEditing) onStartEdit(row, col)
              }
            : undefined
          const cellBody =
            isCellEditing && editingState ? (
              <div className="flex-1 flex items-center px-1 py-1">
                <EditComp
                  value={editingState.editValue}
                  onChange={onChangeEditValue}
                  onComplete={() => onCompleteEdit(col, row)}
                  onCancel={onCancelEdit}
                  row={row}
                  error={editingState.error}
                />
              </div>
            ) : (
              <div className={contentCls} onClick={handleEditableClick}>
                {rendered}
              </div>
            )
          return (
            <div
              key={colId}
              role="gridcell"
              className={outerCls}
              style={{
                width,
                minWidth,
                flex: width === undefined ? "1 1 0" : undefined,
                left: isLeft ? leftOffsets[i] : undefined,
                right: isRight ? rightOffsets[i] : undefined,
              }}
              {...(col.editable ? { "data-no-row-click": true } : {})}
            >
              {isHead ? (
                // Head 셀 (rowGrouping span > 1) — 컨텐츠를 absolute 로 세로 확장.
                // outer 는 row height 유지 (다른 셀 정렬 흔들림 방지), content 만 spanHeight 만큼 뻗음.
                // border-b 로 그룹 하단 경계 표시 + bg 로 middle rows 위에 opaque 커버.
                // headBgClass: 그룹 내 어떤 row 라도 hover 중이면 hover bg. head row 자체 selected 면 selected bg.
                // row 자체의 bgClass 와 분리 — head row (span 시작 row) 가 hover 안 됐어도 middle row hover 시 head 셀은 hover 표시돼야 함.
                (() => {
                  const isGroupHovered = getGroupHovered(rowIndex, col.accessorKey)
                  const headBgClass = isGroupHovered
                    ? "bg-slate-100 dark:bg-slate-800"
                    : isSelected
                      ? "bg-blue-50 dark:bg-blue-900"
                      : "bg-white dark:bg-slate-900"
                  return (
                    <div
                      className={cn(
                        "absolute top-0 left-0 right-0 flex border-b border-slate-200 dark:border-slate-700 transition-colors",
                        headBgClass
                      )}
                      style={{ height: spanHeight }}
                    >
                      {cellBody}
                    </div>
                  )
                })()
              ) : (
                cellBody
              )}
            </div>
          )
        })}
      </div>
      {isExpanded && expandedContent && (
        <div
          data-no-row-click
          className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700"
        >
          {expandedContent}
        </div>
      )}
    </div>
  )
}

type DataTableV2RowComponent = <T extends { id: string | number }>(
  props: DataTableV2RowProps<T>
) => React.ReactElement | null

export const DataTableV2Row = React.memo(DataTableV2RowInner) as DataTableV2RowComponent
