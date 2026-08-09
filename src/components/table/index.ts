// Table primitives (순수 빌딩블록)
export * from './table'

// Pagination (순수 컴포넌트)
export * from './pagination'

// DataTable (고수준 조합)
export * from './data-table'

// DataTable v2 (div 기반 그리드, v1 과 병행 배포)
export { DataTableV2 } from './data-table-v2'
export type { DataTableV2Column, DataTableV2Props } from './data-table-v2'

// v1 과 이름이 겹치는 타입은 `DataTableV2` 접두사를 붙여 내보낸다.
//
// 그냥 re-export 하면 v1 의 동명 타입과 충돌하고, 안 내보내면 사용처가
// `stl-design-system/dist/components/table/data-table-v2/types` 같은 내부 경로를
// 직접 파고들어야 한다. 특히 SortState 는 v1 이 `column: keyof T | null`,
// v2 가 `column: keyof T` 로 **호환되지 않아서** 사용처가 v1 타입을 그대로 쓰면
// 빌드가 깨진다 (CMS 이관 중 실제로 발생).
export type {
  SortState as DataTableV2SortState,
  SortDirection as DataTableV2SortDirection,
  HeaderGroup as DataTableV2HeaderGroup,
  EditComponentProps as DataTableV2EditComponentProps,
  ValidationResult as DataTableV2ValidationResult,
  ExpandableConfig as DataTableV2ExpandableConfig,
  RowActionsConfig as DataTableV2RowActionsConfig,
  RowGroupConfig as DataTableV2RowGroupConfig,
  VirtualConfig as DataTableV2VirtualConfig,
  FilterConfig as DataTableV2FilterConfig,
  FilterOption as DataTableV2FilterOption,
  FilterComponentProps as DataTableV2FilterComponentProps,
} from './data-table-v2/types'

// Table patterns (조합 패턴)
export * from './table-container'
export * from './table-toolbar'
export * from './pagination-footer'
export * from './search-form'
export * from './filter-chip-summary'
