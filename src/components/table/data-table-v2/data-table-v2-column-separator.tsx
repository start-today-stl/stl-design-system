import * as React from "react"

import { cn } from "@/lib/utils"

interface DataTableV2ColumnSeparatorProps {
  /** 리사이즈 가능 여부 (true 면 호버 시 파란 인디케이터 + col-resize 커서) */
  resizable?: boolean
  /** 리사이즈 진행 중 여부 (인디케이터를 활성 상태로 유지) */
  isResizing?: boolean
  /**
   * 리사이즈 시작 핸들러 — parent 의 stable useCallback ref 로 받음.
   * (인라인 arrow 로 넘기면 매 렌더마다 새 ref → React.memo 실패 → 리렌더)
   */
  onResizeStart?: (e: React.MouseEvent, column: unknown) => void
  /** 이 separator 가 속한 컬럼 (stable ref 기대) — 리사이즈 시 onResizeStart 에 전달 */
  column?: unknown
}

/**
 * 컬럼 헤더 우측에 절대 배치되는 세로 구분선 겸 리사이즈 핸들.
 *
 * - 기본 상태: 짧은 세로 구분선 (h-4, w-px, slate-300)
 * - resizable + 호버: blue-500 + w-[2px] (리사이즈 가능 인디케이터)
 * - 진행 중: 호버 여부와 무관하게 활성 색상 유지
 *
 * 절대 배치를 쓰는 이유: 셀 폭에서 separator 폭이 차감되지 않도록 하기 위함.
 * 셀의 우측 padding 영역에 겹쳐 렌더된다 (레이아웃 폭에 영향 없음).
 */
function DataTableV2ColumnSeparatorInner({
  resizable = false,
  isResizing = false,
  onResizeStart,
  column,
}: DataTableV2ColumnSeparatorProps) {
  // onResizeStart 와 column 을 useCallback 으로 wrap → parent 가 stable ref 로 넘기면
  // handleMouseDown 도 stable → separator memo 유지 (인라인 arrow 로 넘기지 않도록 하기 위함)
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (onResizeStart && column !== undefined) onResizeStart(e, column)
    },
    [onResizeStart, column]
  )

  return (
    <div
      aria-hidden
      className={cn(
        // 실제 세로 선은 셀 경계 (right: 0) 에 위치시켜서 좌/우 셀의 컨텐츠와 대칭 거리 유지.
        // (justify-center 면 셀 안쪽 3px 로 편향되어 좌우 셀의 필터 아이콘까지 거리가 비대칭)
        "absolute right-0 top-0 h-full w-[6px] flex items-center justify-end",
        resizable && "cursor-col-resize group/resize"
      )}
      onMouseDown={resizable && onResizeStart ? handleMouseDown : undefined}
    >
      <span
        className={cn(
          "block h-4 w-px bg-slate-300 dark:bg-slate-600 transition-all",
          resizable &&
            "group-hover/resize:bg-blue-500 dark:group-hover/resize:bg-blue-400 group-hover/resize:w-[2px]",
          isResizing && "bg-blue-500 dark:bg-blue-400 w-[2px]"
        )}
      />
    </div>
  )
}

export const DataTableV2ColumnSeparator = React.memo(DataTableV2ColumnSeparatorInner)
