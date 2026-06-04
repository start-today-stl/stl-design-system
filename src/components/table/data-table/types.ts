import type * as React from "react"
import type { DraggableAttributes } from "@dnd-kit/core"
import type { SortDirection } from "@/components/table/table"

/** 편집 컴포넌트 Props */
export interface EditComponentProps<T, K extends keyof T = keyof T> {
  /** 현재 값 */
  value: T[K]
  /** 값 변경 핸들러 */
  onChange: (value: T[K]) => void
  /** 편집 완료 핸들러 (Enter 시 호출 - 검증 후 저장) */
  onComplete: () => void
  /** 편집 취소 핸들러 (Escape 또는 blur 시 호출 - 원래 값으로 복원) */
  onCancel: () => void
  /** 해당 행 데이터 */
  row: T
  /** 검증 에러 메시지 */
  error?: string
}

/** 검증 결과 타입 */
export type ValidationResult = true | string

/** 컬럼 정의 */
export interface DataTableColumn<T> {
  /** 데이터 접근 키. cell 함수의 첫 번째 인자 (value) 의 출처. */
  accessorKey: keyof T
  /**
   * 컬럼 식별 key. 같은 `accessorKey` 를 가진 컬럼이 둘 이상 있을 때 (예: 같은 데이터를 다른
   * 형식으로 두 컬럼에 표시) 반드시 지정해야 React key 중복 경고를 피할 수 있습니다.
   * 지정하지 않으면 `String(accessorKey)` 가 key 로 사용됩니다.
   */
  id?: string
  /** 헤더 텍스트 */
  header: React.ReactNode
  /** 정렬 가능 여부 */
  sortable?: boolean
  /** 컬럼 고정 너비 (sticky 컬럼에 권장) */
  width?: string | number
  /** 컬럼 최소 너비 (width 미설정 시 남은 공간을 채움) */
  minWidth?: string | number
  /** 셀 정렬 */
  align?: "left" | "center" | "right"
  /** 커스텀 셀 렌더러 */
  cell?: (value: T[keyof T], row: T) => React.ReactNode
  /** 편집 가능 여부 */
  editable?: boolean
  /** 커스텀 편집 컴포넌트 (기본: Input) */
  editComponent?: (props: EditComponentProps<T>) => React.ReactNode
  /** 값 검증 함수 (true: 통과, string: 에러 메시지) */
  validate?: (value: T[keyof T], row: T) => ValidationResult
  /** 고정 컬럼 (left: 왼쪽 고정, right: 오른쪽 고정) */
  sticky?: "left" | "right"
}

/** 헤더 그룹 정의 (다중 레벨 헤더) */
export interface HeaderGroup<T> {
  /** 그룹 헤더 텍스트 */
  header: React.ReactNode
  /** 이 그룹에 포함되는 컬럼 키 배열 */
  columns: (keyof T)[]
  /** 정렬 */
  align?: "left" | "center" | "right"
}

/** 로우 그룹핑 설정 */
export interface RowGroupConfig<T> {
  /** 그룹핑할 컬럼 키 (해당 컬럼 값이 같은 행들은 셀이 병합됨) */
  groupBy: keyof T | (keyof T)[]
  /** 그룹핑 적용 컬럼들 (미지정 시 groupBy 컬럼만 병합) */
  mergeColumns?: (keyof T)[]
}

/** 정렬 상태 */
export interface SortState<T> {
  column: keyof T | null
  direction: SortDirection
}

/** 확장 가능 행 설정 */
export interface ExpandableConfig<T> {
  /** 확장 영역 렌더링 함수 */
  expandedRowRender: (row: T) => React.ReactNode
  /** 행이 확장 가능한지 여부를 결정하는 함수 (기본: 모든 행 확장 가능) */
  rowExpandable?: (row: T) => boolean
  /** 기본 확장된 행 ID 배열 */
  defaultExpandedRowIds?: (string | number)[]
  /** 확장된 행 ID 배열 (제어 컴포넌트) */
  expandedRowIds?: (string | number)[]
  /** 확장 상태 변경 핸들러 */
  onExpandedChange?: (expandedRowIds: (string | number)[]) => void
  /** 헤더에 전체 펼치기/접기 버튼 표시 여부 (기본: true) */
  showExpandAll?: boolean
}

/** 편집 중인 셀 상태 */
export interface EditingCell<T> {
  rowId: string | number
  columnKey: keyof T
  error?: string
}

/** 행 추가/삭제 액션 설정 */
export interface RowActionsConfig<T> {
  /** 행 삭제 핸들러 (각 행에 삭제 아이콘 표시) */
  onRowDelete?: (row: T) => void
  /** 행 추가 핸들러 (테이블 하단에 추가 행 표시) */
  onRowAdd?: () => void
  /** 삭제 아이콘 표시 여부 (기본: onRowDelete가 있으면 true) */
  showDelete?: boolean
  /** 추가 행 표시 여부 (기본: onRowAdd가 있으면 true) */
  showAdd?: boolean
}

export interface DataTableProps<T extends { id: string | number }> {
  /**
   * 컬럼 정의.
   *
   * 안정성 권장: 컴포넌트 외부에 정의하거나 `useMemo` 로 감싸세요. 매 render 마다 새 배열을
   * 넘기면 모든 행이 리렌더됩니다.
   */
  columns: DataTableColumn<T>[]
  /**
   * 데이터 배열.
   *
   * 안정성 권장: `useState` 또는 `useMemo` 로 안정 ref 유지. 매 render 마다 새 배열을 넘기면
   * 모든 행이 리렌더됩니다. (정렬/필터링으로 의미 있게 변경되는 건 정상)
   */
  data: T[]
  /** 선택 기능 활성화 */
  selectable?: boolean
  /** 선택된 행 ID 배열 */
  selectedIds?: (string | number)[]
  /** 선택 변경 핸들러 */
  onSelectionChange?: (selectedIds: (string | number)[]) => void
  /** 행 클릭 핸들러 */
  onRowClick?: (row: T) => void
  /** 셀 값 변경 핸들러 */
  onCellChange?: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
  /** 확장 가능 행 설정 */
  expandable?: ExpandableConfig<T>
  /** 빈 데이터 메시지 */
  emptyMessage?: React.ReactNode
  /** 추가 className */
  className?: string
  /** 행 className 커스터마이즈 */
  rowClassName?: (row: T) => string
  /** 테이블 본문 최대 높이 (초과 시 내부 스크롤) */
  maxHeight?: number | string
  /** 컬럼 리사이징 활성화 */
  resizable?: boolean
  /** 컬럼 너비 상태 (제어 컴포넌트) */
  columnWidths?: Record<string, number>
  /** 컬럼 너비 변경 핸들러 */
  onColumnResize?: (columnKey: keyof T, width: number) => void
  /** 컬럼 순서 변경 활성화 */
  columnReorderable?: boolean
  /** 컬럼 순서 (accessorKey 배열) */
  columnOrder?: (keyof T)[]
  /** 컬럼 순서 변경 핸들러 */
  onColumnReorder?: (newOrder: (keyof T)[]) => void
  /** 로우 순서 변경 활성화 */
  rowReorderable?: boolean
  /** 로우 순서 변경 핸들러 */
  onRowReorder?: (newData: T[]) => void
  /** 로딩 상태 */
  loading?: boolean
  /** 로딩 모드 (splash: SplashScreen, skeleton: 컬럼 기반 스켈레톤 자동 생성) */
  loadingMode?: "splash" | "skeleton"
  /** 커스텀 로딩 콘텐츠 (loadingMode보다 우선 적용) */
  loadingContent?: React.ReactNode
  /** 헤더 그룹 정의 (다중 레벨 헤더) */
  headerGroups?: HeaderGroup<T>[]
  /** 로우 그룹핑 설정 (셀 병합) */
  rowGrouping?: RowGroupConfig<T>
  /** 행 추가/삭제 액션 설정 */
  rowActions?: RowActionsConfig<T>
  /** 정렬 상태 (항상 배열, 단일 정렬도 1-원소 배열로) */
  sortState?: SortState<T>[]
  /** 정렬 변경 핸들러 */
  onSortChange?: (sortState: SortState<T>[]) => void
  /** 다중 정렬 활성화 (클릭 시 정렬 추가/순환). 기본 false=단일 정렬 */
  multiSort?: boolean
  /**
   * 가상화 (windowing) — 큰 데이터셋에서 화면에 보이는 행만 렌더링.
   * - true: 기본 옵션으로 활성화
   * - { overscan, estimateSize }: 옵션 커스터마이징
   * - false / 생략: 비활성화 (기본)
   *
   * 비호환 기능: rowGrouping (rowSpan), rowReorderable (드래그앤드롭).
   * 위 기능이 활성 상태면 가상화가 자동으로 OFF 되며 dev 경고 출력.
   */
  virtual?: boolean | VirtualConfig
}

/** 가상화 옵션 */
export interface VirtualConfig {
  /** 화면 밖 추가 렌더 행 수 (default 5) */
  overscan?: number
  /** 행 추정 높이 px — 초기 스크롤 영역 계산용 (default 40) */
  estimateSize?: number
}

/** 드래그 핸들 props (Sortable 내부 전달용) */
export interface DragHandleProps {
  listeners?: Record<string, unknown>
  attributes?: DraggableAttributes
  setActivatorNodeRef?: (element: HTMLElement | null) => void
}

/** sticky 스타일 결과 */
export interface StickyStyleResult {
  style: React.CSSProperties
  className: string
}

/** 컬럼 너비 상수 */
export const DRAG_HANDLE_WIDTH = 32
export const CHECKBOX_WIDTH = 40
export const EXPAND_WIDTH = 40
export const ROW_ACTIONS_WIDTH = 40
