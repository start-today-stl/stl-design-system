import type * as React from "react"

import type { SortDirection } from "@/components/table/table"

export type { SortDirection }

/** 정렬 상태 (다중 정렬 지원. 배열의 앞쪽이 우선순위 높음) */
export interface SortState<T> {
  column: keyof T
  direction: SortDirection
}

/** 편집 컴포넌트 Props */
export interface EditComponentProps<T, K extends keyof T = keyof T> {
  /** 현재 값 */
  value: T[K]
  /** 값 변경 핸들러 */
  onChange: (value: T[K]) => void
  /** 편집 완료 핸들러 (Enter/blur — 검증 후 저장) */
  onComplete: () => void
  /** 편집 취소 핸들러 (Escape — 원래 값 복원) */
  onCancel: () => void
  /** 해당 행 데이터 */
  row: T
  /** 검증 에러 메시지 (있으면 표시) */
  error?: string
}

/** 검증 결과. true 면 통과, string 이면 에러 메시지. */
export type ValidationResult = true | string

/** 확장 가능 행 설정 */
export interface ExpandableConfig<T> {
  /** 확장 영역 렌더링 함수 */
  expandedRowRender: (row: T) => React.ReactNode
  /** 행이 확장 가능한지 여부 (기본: 모든 행) */
  rowExpandable?: (row: T) => boolean
  /** 초기 확장된 행 ID (uncontrolled) */
  defaultExpandedRowIds?: (string | number)[]
  /** 확장된 행 ID (controlled) */
  expandedRowIds?: (string | number)[]
  /** 확장 상태 변경 콜백 */
  onExpandedChange?: (expandedRowIds: (string | number)[]) => void
  /** 헤더에 전체 펼치기/접기 버튼 표시 (기본: true) */
  showExpandAll?: boolean
}

/** 행 추가/삭제 액션 설정 */
export interface RowActionsConfig<T> {
  /** 행 삭제 핸들러 (각 행에 삭제 아이콘 표시) */
  onRowDelete?: (row: T) => void
  /** 행 추가 핸들러 (테이블 하단에 추가 행 표시) */
  onRowAdd?: () => void
  /** 삭제 아이콘 표시 여부 (기본: onRowDelete 있으면 true) */
  showDelete?: boolean
  /** 추가 행 표시 여부 (기본: onRowAdd 있으면 true) */
  showAdd?: boolean
}

/** 다중 레벨 헤더의 그룹 정의 */
export interface HeaderGroup<T> {
  /** 그룹 헤더 텍스트/노드 */
  header: React.ReactNode
  /** 이 그룹에 포함되는 컬럼 accessorKey 배열 (인접한 컬럼이어야 함) */
  columns: (keyof T)[]
  /** 셀 정렬 */
  align?: "left" | "center" | "right"
}

/** DataTable v2 컬럼 정의 */
export interface DataTableV2Column<T> {
  /** 데이터 접근 키 */
  accessorKey: keyof T
  /**
   * 컬럼 식별 key. 같은 accessorKey 가 둘 이상일 때 지정.
   * 미지정 시 String(accessorKey) 사용.
   */
  id?: string
  /** 헤더 텍스트/노드 */
  header: React.ReactNode
  /** 정렬 가능 여부 */
  sortable?: boolean
  /** 고정 너비. px 숫자 또는 CSS 문자열 */
  width?: string | number
  /** 최소 너비. 지정 시 minmax(minWidth, 1fr) 로 처리 */
  minWidth?: string | number
  /** 셀/헤더 정렬 */
  align?: "left" | "center" | "right"
  /** 커스텀 셀 렌더러 */
  cell?: (value: T[keyof T], row: T) => React.ReactNode
  /** 편집 가능 여부 (셀 클릭 시 편집 모드 진입) */
  editable?: boolean
  /** 커스텀 편집 컴포넌트 (기본: Input) */
  editComponent?: (props: EditComponentProps<T>) => React.ReactNode
  /** 값 검증 함수 — true 통과, string 에러 메시지 */
  validate?: (value: T[keyof T], row: T) => ValidationResult
  /** 고정 컬럼 위치 (좌/우 pinned) */
  pinned?: "left" | "right"
}

/** DataTable v2 Props */
export interface DataTableV2Props<T extends { id: string | number }> {
  /** 행 데이터 */
  data: T[]
  /** 컬럼 정의 */
  columns: DataTableV2Column<T>[]
  /** 다중 레벨 헤더 그룹 (지정 시 헤더가 2행으로 렌더) */
  headerGroups?: HeaderGroup<T>[]
  /** 정렬 상태 (controlled) */
  sortState?: SortState<T>[]
  /** 정렬 상태 변경 콜백 */
  onSortChange?: (sortState: SortState<T>[]) => void
  /** 다중 정렬 활성화 (Shift + 헤더 클릭 시 추가) */
  multiSort?: boolean
  /** 컬럼 리사이즈 활성화 (헤더 우측 드래그로 폭 조절) */
  resizable?: boolean
  /** 컬럼 폭 (controlled). key = String(accessorKey) */
  columnWidths?: Record<string, number>
  /** 컬럼 폭 변경 콜백 */
  onColumnResize?: (columnKey: keyof T, width: number) => void
  /** 컬럼 순서 변경 활성화 (헤더 드래그로 재정렬. pinned/sortable 컬럼은 대상 제외) */
  columnReorderable?: boolean
  /** 컬럼 순서 (controlled). accessorKey 배열 */
  columnOrder?: (keyof T)[]
  /** 컬럼 순서 변경 콜백 */
  onColumnReorder?: (newOrder: (keyof T)[]) => void
  /** 행 선택 활성화 (체크박스 컬럼 좌측에 자동 추가) */
  selectable?: boolean
  /** 선택된 행 ID (controlled) */
  selectedIds?: (string | number)[]
  /** 초기 선택된 행 ID (uncontrolled) */
  defaultSelectedIds?: (string | number)[]
  /** 선택 상태 변경 콜백 */
  onSelectionChange?: (selectedIds: (string | number)[]) => void
  /** 행 클릭 콜백 (셀 편집/버튼 클릭과 분리됨) */
  onRowClick?: (row: T) => void
  /** 행별 추가 className 반환 함수 */
  rowClassName?: (row: T) => string
  /** 확장 가능 행 설정 (지정 시 확장 컬럼 좌측에 자동 추가) */
  expandable?: ExpandableConfig<T>
  /** 셀 값 변경 콜백 (편집 완료 + validate 통과 시 호출) */
  onCellChange?: (rowId: string | number, columnKey: keyof T, value: T[keyof T]) => void
  /** 행 추가/삭제 액션 (지정 시 삭제 컬럼 우측 pinned + 하단 추가 행) */
  rowActions?: RowActionsConfig<T>
  /** 로딩 상태 */
  loading?: boolean
  /** 로딩 표시 방식 (기본: splash) */
  loadingMode?: "splash" | "skeleton"
  /** 커스텀 로딩 콘텐츠 (지정 시 loadingMode 무시) */
  loadingContent?: React.ReactNode
  /** 빈 데이터 메시지 (기본: "데이터가 없습니다.") */
  emptyMessage?: React.ReactNode
  /** 스크롤 컨테이너 최대 높이 */
  maxHeight?: number | string
  /**
   * 행 예상 높이 (px). ResizeObserver 로 실제 높이가 측정되기 전 초기 배치에 사용.
   * 기본 40
   */
  estimateRowHeight?: number
  /** 추가 className (Outer wrapper 에 적용) */
  className?: string
}
