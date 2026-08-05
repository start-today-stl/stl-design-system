import * as React from "react"

import { DataTableV2DefaultEdit } from "./data-table-v2-default-edit"
import type { DataTableV2Column } from "./types"

interface DataTableV2EditCellProps<T extends { id: string | number }> {
  row: T
  column: DataTableV2Column<T>
  /** 검증 실패 메시지 (부모가 보관) */
  error?: string
  /** 편집 확정 (Enter / blur). 현재 편집값을 인자로 넘긴다 */
  onComplete: (column: DataTableV2Column<T>, row: T, value: T[keyof T]) => void
  /** 편집 취소 (Escape) */
  onCancel: () => void
  /** 값이 바뀌어서 기존 에러를 지워야 할 때 */
  onClearError: () => void
}

/**
 * 편집 중인 셀 wrapper.
 *
 * 편집 임시값 (editValue) 을 **이 컴포넌트의 로컬 state 로 보관** 한다.
 * 부모 (DataTableV2) 가 값을 들고 있으면 타이핑 한 글자마다 부모가 리렌더되고,
 * 헤더는 부모 JSX 안에서 인라인으로 그려지므로 헤더 전체가 매 글자마다 다시 그려진다.
 * 부모는 "어느 셀이 편집 중인가" (rowId + columnKey) 와 검증 에러만 알면 된다.
 *
 * `EditComponentProps` 계약 (value / onChange / onComplete / onCancel / row / error) 은
 * 그대로 유지되므로 사용처의 커스텀 `editComponent` 는 영향 없음.
 */
export function DataTableV2EditCell<T extends { id: string | number }>({
  row,
  column,
  error,
  onComplete,
  onCancel,
  onClearError,
}: DataTableV2EditCellProps<T>) {
  const [value, setValue] = React.useState<T[keyof T]>(row[column.accessorKey])

  // 커스텀 편집기의 `onChange(v); onComplete();` 동일 tick 패턴 대비.
  // setState 반영 전에 onComplete 이 불려도 최신 값을 넘기기 위해 ref 에도 보관.
  const valueRef = React.useRef(value)
  const errorRef = React.useRef(error)
  errorRef.current = error

  // 같은 편집 확정이 두 번 발화되는 것 방지.
  // 바깥 클릭(mousedown)으로 저장한 직후 input 의 blur 가 이어서 발화하는데, 그 사이 React
  // 리렌더가 아직 안 끝났으면 onComplete 가 두 번 불려 onCellChange 도 두 번 호출된다.
  // (사용처가 API 호출/append 를 하면 실제 버그. 값이 바뀌면 다시 확정 가능하도록 해제.)
  const completedRef = React.useRef(false)

  const handleChange = React.useCallback(
    (next: T[keyof T]) => {
      valueRef.current = next
      completedRef.current = false
      setValue(next)
      // 에러가 떠 있을 때만 부모에 알림 (매 타이핑마다 부모 리렌더되는 것 방지)
      if (errorRef.current !== undefined) onClearError()
    },
    [onClearError]
  )

  const handleComplete = React.useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete(column, row, valueRef.current)
  }, [onComplete, column, row])

  // 셀 바깥 클릭 시 편집 확정 (v1 동작과 동일 — 취소가 아니라 저장).
  // 기본 Input 은 자체 onBlur 로 종료되지만, 커스텀 editComponent (Select 등) 는 blur 핸들링이
  // 없어서 이게 없으면 바깥을 클릭해도 편집 모드가 안 풀린다.
  const cellRef = React.useRef<HTMLDivElement>(null)
  const completeRef = React.useRef(handleComplete)
  completeRef.current = handleComplete

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (cellRef.current?.contains(target)) return
      // Radix 포털(Select 드롭다운 등)은 body 밑에 렌더되므로 셀 바깥으로 잡힌다.
      // 예외 처리 안 하면 옵션을 고르는 순간 편집이 종료된다.
      if ((target as Element).closest?.("[data-radix-popper-content-wrapper]")) return
      completeRef.current()
    }
    document.addEventListener("mousedown", handleMouseDown)
    return () => document.removeEventListener("mousedown", handleMouseDown)
  }, [])

  const EditComp = column.editComponent ?? DataTableV2DefaultEdit

  // 세로 패딩 없음 — 편집기 높이(Input / Select 모두 h-9 = 36px)가 셀의 min-h-9 와 정확히
  // 일치해야 한다. 1px 이라도 커지면 행 높이가 변하고, 행은 `top: positions[i]` (높이 누적합)
  // 으로 배치되므로 **그 아래 모든 행의 top 이 밀려서 전부 리렌더** 된다.
  // (검증 에러 표시 시엔 한 줄 늘어나 아래가 밀리는데, 이는 v1 과 동일한 의도된 동작.
  //  행 높이를 절대 유지해야 하면 사용처가 editComponent 로 툴팁/토스트 방식을 쓰면 된다.)
  return (
    <div ref={cellRef} className="flex-1 flex items-center px-1">
      <EditComp
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
        onCancel={onCancel}
        row={row}
        error={error}
      />
    </div>
  )
}
