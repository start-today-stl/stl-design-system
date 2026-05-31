import { EditComponentProps, ValidationResult, DataTableColumn, HeaderGroup, RowGroupConfig, SortState, ExpandableConfig, RowActionsConfig, DataTableProps } from './types';
export type { EditComponentProps, ValidationResult, DataTableColumn, HeaderGroup, RowGroupConfig, SortState, ExpandableConfig, RowActionsConfig, DataTableProps, };
/**
 * 정렬 / 필터 / 선택 / 편집 / 펼침 / 그룹핑 / 가상화 등을 지원하는 데이터 테이블.
 *
 * ## prop 안정성 가이드
 *
 * 큰 데이터셋 (수백~수만 행) 에서 부드러운 인터랙션을 보장하려면 일부 prop 을 안정된
 * reference 로 전달해야 합니다.
 *
 * - **columns**: 컴포넌트 외부 const 로 정의하거나 `useMemo` 로 감싸세요.
 *   매 render 마다 새 배열을 넘기면 모든 행이 리렌더되어 성능이 저하됩니다.
 * - **data**: `useState` 또는 `useMemo` 로 안정 ref 를 유지하세요.
 *   (정렬/필터링으로 의미 있게 변경되는 건 정상)
 * - **rowGrouping / expandable / 콜백 props**: 내부에서 흡수하므로 inline 으로 넘겨도 안전합니다.
 *
 * ```tsx
 * // ✅ 권장
 * const columns = useMemo(() => [...], [])
 * const [data, setData] = useState([...])
 * <DataTable columns={columns} data={data} onRowClick={(row) => doSomething(row)} />
 *
 * // ❌ 비권장 (모든 행 리렌더)
 * <DataTable columns={[...]} data={[...]} />
 * ```
 */
declare function DataTable<T extends {
    id: string | number;
}>({ columns, data, selectable, selectedIds, onSelectionChange, sortState, onSortChange, multiSort, onRowClick, onCellChange, expandable: expandableProp, emptyMessage, className, rowClassName, maxHeight, resizable, columnWidths, onColumnResize, columnReorderable, columnOrder, onColumnReorder, rowReorderable: rowReorderableProp, onRowReorder, loading, loadingMode, loadingContent, headerGroups, rowGrouping: rowGroupingProp, rowActions, virtual, }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export { DataTable };
