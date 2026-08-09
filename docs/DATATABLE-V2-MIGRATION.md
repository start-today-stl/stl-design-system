# DataTable v1 → v2 마이그레이션 가이드

DataTable v2 는 v1 의 구조적 한계를 해결하기 위한 재설계 버전입니다.

**v1 은 그대로 유지됩니다.** 두 버전이 함께 배포되므로 한 번에 전부 옮길 필요가 없습니다.
페이지 단위로 하나씩 이관하고, 문제가 생기면 그 페이지만 되돌리면 됩니다.

---

## 왜 옮기나

v1 은 HTML `<table>` 기반이라 아래가 **구조적으로 불가능**했습니다.

| v1 에서 안 되던 것 | 이유 |
|---|---|
| 고정 컬럼 + 가상화 | sticky + 가상 스크롤에서 sub-pixel 렌더링으로 테두리가 깜빡임 |
| 행 드래그 + 가상화 | 자동 비활성화됨 |
| 셀 병합 + 가상화 | 자동 비활성화됨 |

v1 은 위 조합에서 **가상화를 스스로 꺼버립니다.** 즉 고정 컬럼이 있는 넓은 테이블은
행이 아무리 많아도 전부 DOM 에 그려집니다.

v2 는 `<div role="grid">` + 절대좌표 배치로 설계해서 **모든 조합이 함께 동작합니다.**

v2 에서 새로 생긴 것:

- **컬럼 헤더 필터** — 프리셋 5종(텍스트/선택/다중선택/날짜범위/숫자범위) + 커스텀
- **행 그룹핑(셀 병합) + 가상화 조합**
- 헤더 그룹이 컬럼 순서 변경에 따라 자동으로 갈라짐 (AG Grid 와 동일)

---

## 최소 변경으로 옮기기

대부분의 테이블은 **아래 두 가지만 바꾸면 됩니다.**

### 1. 컴포넌트와 타입 이름

```diff
- import { DataTable, type DataTableColumn } from "stl-design-system"
+ import { DataTableV2, type DataTableV2Column } from "stl-design-system"

- const columns: DataTableColumn<Row>[] = [...]
+ const columns: DataTableV2Column<Row>[] = [...]

- <DataTable columns={columns} data={data} />
+ <DataTableV2 columns={columns} data={data} />
```

### 2. 고정 컬럼 prop 이름

```diff
- { accessorKey: "code", header: "코드", width: 100, sticky: "left" }
+ { accessorKey: "code", header: "코드", width: 100, pinned: "left" }
```

`sticky` → `pinned` 로 바뀌었습니다. **이름만 바뀌었고 동작은 같습니다.**

> v1 의 `sticky` 는 CSS 속성 이름을 그대로 쓴 것이라, 무엇을 하는 prop 인지
> 읽어서 알기 어려웠습니다. 업계 표준 용어인 `pinned` 로 맞췄습니다.

**이외의 prop 은 이름과 동작이 모두 같습니다.** `selectable` / `selectedIds` /
`onSelectionChange` / `sortState` / `onSortChange` / `multiSort` / `resizable` /
`columnWidths` / `onColumnResize` / `columnReorderable` / `columnOrder` /
`onColumnReorder` / `rowReorderable` / `onRowReorder` / `expandable` / `rowGrouping` /
`rowActions` / `onRowClick` / `rowClassName` / `onCellChange` / `loading` /
`loadingMode` / `loadingContent` / `emptyMessage` / `maxHeight` / `headerGroups` /
`virtual` 전부 그대로입니다.

---

## 함께 확인해야 하는 것

### DOM 구조가 바뀝니다

`<table>` / `<tr>` / `<td>` 가 아니라 `<div role="grid">` / `role="row"` /
`role="gridcell"` 로 렌더됩니다.

**테이블 내부를 태그 셀렉터로 노린 CSS 가 있으면 적용되지 않습니다.**

```css
/* 이런 CSS 는 v2 에서 안 먹습니다 */
.my-table td { padding: 8px; }
.my-table tr:hover { background: #eee; }
```

행 스타일은 `rowClassName` prop 으로, 셀 스타일은 `cell` 렌더러 안에서 처리해 주세요.

접근성은 오히려 개선됐습니다. `role="grid"` 에 `aria-rowcount` / `aria-colcount` /
`aria-rowindex` / `aria-sort` 를 부여해서 스크린리더가 표로 정확히 인식합니다.

### 행 높이가 자동 측정됩니다

v1 은 행 높이를 고정으로 봤지만, v2 는 실제 렌더된 높이를 측정해서 배치합니다.
셀 내용에 따라 행마다 높이가 달라도 겹치거나 빈틈이 생기지 않습니다.

가상화를 쓸 때 초기 배치용 예상 높이를 `estimateRowHeight` 로 줄 수 있습니다
(기본 40). 실제 높이와 크게 다르면 스크롤바 길이가 처음에 튈 수 있으니,
행이 평균적으로 높은 테이블이면 지정하는 편이 낫습니다.

---

## 새 기능

### 컬럼 헤더 필터

컬럼 정의에 `filter` 를 넣으면 헤더에 필터 아이콘이 생기고, 클릭하면 팝오버가 열립니다.

```tsx
const columns: DataTableV2Column<Order>[] = [
  {
    accessorKey: "orderCode",
    header: "주문번호",
    filter: { type: "text", placeholder: "주문번호 검색" },
  },
  {
    accessorKey: "status",
    header: "주문상태",
    filter: {
      type: "multiSelect",
      options: [
        { label: "대기", value: "PENDING" },
        { label: "완료", value: "DONE" },
      ],
    },
  },
  { accessorKey: "orderedAt", header: "주문일", filter: { type: "dateRange" } },
  { accessorKey: "amount", header: "금액", filter: { type: "numberRange" } },
]

<DataTableV2
  columns={columns}
  data={data}
  filterState={filterState}
  onFilterChange={setFilterState}
/>
```

프리셋으로 부족하면 커스텀 컴포넌트를 넣을 수 있습니다.

```tsx
filter: {
  type: "custom",
  component: ({ value, onChange, onClose }) => (
    <MyFilter value={value} onChange={onChange} onClose={onClose} />
  ),
}
```

`filterState` 값 형태:

| type | 값 |
|---|---|
| `text`, `select` | `string` |
| `multiSelect` | `string[]` |
| `numberRange` | `{ from?: number; to?: number }` |
| `dateRange` | `{ from?: Date; to?: Date }` |

### 가상화

행이 많으면 `virtual` 을 켜세요. 화면에 보이는 행만 DOM 에 그립니다.

```tsx
<DataTableV2 data={rows} columns={columns} virtual maxHeight={520} />
<DataTableV2 data={rows} columns={columns} virtual={{ overscan: 20 }} maxHeight={520} />
```

**한 페이지에 수백 행 이상 그리는 테이블은 켜는 것을 권합니다.** v1 에서 고정 컬럼
때문에 가상화를 못 쓰던 테이블이 있다면 v2 에서는 됩니다.

---

## 알아둘 점

### 정렬과 필터는 컴포넌트가 직접 하지 않습니다

v2 는 상태 변경 콜백만 발화합니다. 실제 정렬·필터링은 사용처가 합니다
(서버 조회 전제). **v1 의 `sortState` / `onSortChange` 와 같은 방식이고, 필터도
동일하게 동작합니다.**

클라이언트에서 처리하려면 직접 적용해야 합니다.

```tsx
const viewRows = useMemo(
  () => applySort(applyFilter(rows, filterState), sortState),
  [rows, filterState, sortState]
)

<DataTableV2 data={viewRows} ... />
```

이걸 빼먹으면 **헤더의 정렬 화살표는 바뀌는데 행은 그대로**여서 고장난 것처럼 보입니다.

### columns 는 안정된 참조로 넘기세요

렌더할 때마다 새 배열/새 객체를 만들면 내부 최적화가 전부 무효화됩니다.

```tsx
// 컴포넌트 밖 상수로 두거나
const columns: DataTableV2Column<Row>[] = [...]

// useMemo 로 감싸세요
const columns = useMemo(() => [...], [handleClick])
```

콜백(`onRowClick`, `onCellChange` 등)은 인라인 화살표로 넘겨도 안전합니다.
v2 내부에서 흡수합니다.

### 타입 이름이 v1 과 겹치는 것들은 `DataTableV2` 접두사가 붙습니다

`SortState` / `HeaderGroup` / `EditComponentProps` 처럼 v1 과 이름이 같은 타입은
접두사를 붙여 내보냅니다.

```diff
- import { type SortState } from "stl-design-system/components"
+ import { type DataTableV2SortState } from "stl-design-system/components"

- const [sortState, setSortState] = useState<SortState<Row>[]>([])
+ const [sortState, setSortState] = useState<DataTableV2SortState<Row>[]>([])
```

**이건 그냥 이름만 바뀐 게 아닙니다.** `SortState` 는 v1 과 v2 의 정의가 다릅니다.

| | v1 | v2 |
|---|---|---|
| `column` | `keyof T \| null` | `keyof T` |

v1 은 "정렬 없음"을 `column: null` 로 표현했지만, v2 는 정렬이 해제되면 배열에서
항목을 빼기 때문에 `null` 이 될 일이 없습니다. 그래서 **v1 타입을 그대로 두면
빌드가 깨집니다.** `tsc --noEmit` 은 통과하고 빌드에서만 잡히는 경우가 있으니
반드시 빌드까지 돌려보세요.

전체 목록:

`DataTableV2SortState` / `DataTableV2SortDirection` / `DataTableV2HeaderGroup` /
`DataTableV2EditComponentProps` / `DataTableV2ValidationResult` /
`DataTableV2ExpandableConfig` / `DataTableV2RowActionsConfig` /
`DataTableV2RowGroupConfig` / `DataTableV2VirtualConfig` /
`DataTableV2FilterConfig` / `DataTableV2FilterOption` /
`DataTableV2FilterComponentProps`

이름이 안 겹치는 `DataTableV2Column` / `DataTableV2Props` 는 그대로입니다.

### 셀 병합 + 가상화 조합의 한계

`rowGrouping` 과 `virtual` 을 함께 쓸 수 있지만, **한 그룹의 행 수가 화면 밖으로
크게 벗어나면** 병합 셀이 잘려 보일 수 있습니다. 대부분의 경우는 커버되지만,
한 그룹이 수십 행 이상인 데이터라면 확인이 필요합니다.

---

## 이관 순서 제안

1. **작고 단순한 테이블 하나**부터 옮겨서 눈으로 확인
2. 문제 없으면 **넓은 테이블 / 행 많은 테이블** — 여기서 가상화 효과가 큼
3. 셀 편집이나 셀 병합을 쓰는 테이블은 마지막

각 단계에서 확인할 것:

- [ ] 고정 컬럼이 가로 스크롤에도 제자리에 있는지
- [ ] 행 선택 / 클릭 / 확장이 그대로 동작하는지
- [ ] 테이블에 걸어둔 커스텀 CSS 가 깨지지 않았는지
- [ ] 정렬·필터가 실제로 데이터에 반영되는지

---

## 참고

- Storybook `Table/DataTableV2` — 스토리 30개. `KitchenSink` 가 전 기능 조합 데모
- 문제가 생기면 v1 을 그대로 두고 해당 페이지만 되돌리면 됩니다
