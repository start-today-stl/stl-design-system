import { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  DataTableV2,
  type DataTableV2Column,
  type EditComponentProps,
  type FilterComponentProps,
} from "../src/components/table/data-table-v2"
import type {
  HeaderGroup,
  SortState,
} from "../src/components/table/data-table-v2/types"
import { Button } from "../src/components/ui/button"
import { Select } from "../src/components/ui/select"

const meta = {
  title: "Table/DataTableV2",
  component: DataTableV2,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableV2>

export default meta
type Story = StoryObj<typeof meta>

interface Row {
  id: number
  name: string
  role: string
  score: number
}

const columns: DataTableV2Column<Row>[] = [
  { accessorKey: "id", header: "ID", width: 60, align: "center" },
  { accessorKey: "name", header: "이름", minWidth: 120 },
  { accessorKey: "role", header: "역할", minWidth: 120 },
  {
    accessorKey: "score",
    header: "점수",
    width: 100,
    align: "right",
    cell: (v) => `${v}점`,
  },
]

const smallData: Row[] = [
  { id: 1, name: "김하나", role: "매니저", score: 92 },
  { id: 2, name: "이두리", role: "엔지니어", score: 88 },
  { id: 3, name: "박세리", role: "디자이너", score: 95 },
  { id: 4, name: "최네오", role: "PM", score: 76 },
]

export const Basic: Story = {
  args: {
    data: smallData,
    columns,
  },
}

const manyData: Row[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `사용자 ${i + 1}`,
  role: ["매니저", "엔지니어", "디자이너", "PM"][i % 4],
  score: 50 + Math.floor(Math.random() * 50),
}))

export const Scrollable: Story = {
  args: {
    data: manyData,
    columns,
    maxHeight: 400,
  },
}

const variableHeightData: Row[] = [
  { id: 1, name: "짧은 텍스트", role: "매니저", score: 90 },
  {
    id: 2,
    name: "여러 줄로 늘어나는 긴 이름 텍스트. 셀 폭이 좁을 때 두 줄, 세 줄까지 자연스럽게 늘어나는 케이스를 재현합니다.",
    role: "엔지니어",
    score: 85,
  },
  { id: 3, name: "다시 짧은 행", role: "디자이너", score: 78 },
  {
    id: 4,
    name: "또 다른 긴 셀 내용. 행별로 다른 높이를 가지는 상황을 재현합니다.",
    role: "PM",
    score: 82,
  },
  { id: 5, name: "마지막 짧은 행", role: "매니저", score: 91 },
]

export const VariableRowHeight: Story = {
  args: {
    data: variableHeightData,
    columns,
    maxHeight: 400,
  },
}

const sortableColumns: DataTableV2Column<Row>[] = [
  { accessorKey: "id", header: "ID", width: 60, align: "center", sortable: true },
  { accessorKey: "name", header: "이름", minWidth: 120, sortable: true },
  { accessorKey: "role", header: "역할", minWidth: 120, sortable: true },
  {
    accessorKey: "score",
    header: "점수",
    width: 100,
    align: "right",
    sortable: true,
    cell: (v) => `${v}점`,
  },
]

function sortRows(rows: Row[], state: SortState<Row>[]): Row[] {
  if (state.length === 0) return rows
  const arr = [...rows]
  arr.sort((a, b) => {
    for (const s of state) {
      const av = a[s.column]
      const bv = b[s.column]
      if (av === bv) continue
      const dir = s.direction === "asc" ? 1 : -1
      return av > bv ? dir : -dir
    }
    return 0
  })
  return arr
}

export const Sortable: Story = {
  render: function Render() {
    const [sortState, setSortState] = useState<SortState<Row>[]>([])
    const sortedData = useMemo(() => sortRows(smallData, sortState), [sortState])
    return (
      <DataTableV2
        data={sortedData}
        columns={sortableColumns}
        sortState={sortState}
        onSortChange={setSortState}
      />
    )
  },
}

export const MultiSort: Story = {
  render: function Render() {
    const [sortState, setSortState] = useState<SortState<Row>[]>([
      { column: "role", direction: "asc" },
      { column: "score", direction: "desc" },
    ])
    const sortedData = useMemo(() => sortRows(smallData, sortState), [sortState])
    return (
      <DataTableV2
        data={sortedData}
        columns={sortableColumns}
        sortState={sortState}
        onSortChange={setSortState}
        multiSort
      />
    )
  },
}

interface OrderRow {
  id: number
  code: string
  productName: string
  qtyOrdered: number
  qtyShipped: number
  amountKrw: number
  amountUsd: number
}

const orderColumns: DataTableV2Column<OrderRow>[] = [
  { accessorKey: "code", header: "코드", width: 100 },
  { accessorKey: "productName", header: "상품명", minWidth: 160 },
  { accessorKey: "qtyOrdered", header: "주문", width: 80, align: "right" },
  { accessorKey: "qtyShipped", header: "출고", width: 80, align: "right" },
  {
    accessorKey: "amountKrw",
    header: "KRW",
    width: 100,
    align: "right",
    cell: (v) => (v as number).toLocaleString(),
  },
  {
    accessorKey: "amountUsd",
    header: "USD",
    width: 100,
    align: "right",
    cell: (v) => `$${v}`,
  },
]

const orderHeaderGroups: HeaderGroup<OrderRow>[] = [
  { header: "수량", columns: ["qtyOrdered", "qtyShipped"], align: "center" },
  { header: "금액", columns: ["amountKrw", "amountUsd"], align: "center" },
]

const orderData: OrderRow[] = [
  { id: 1, code: "PRD-001", productName: "제품 A", qtyOrdered: 100, qtyShipped: 80, amountKrw: 500000, amountUsd: 380 },
  { id: 2, code: "PRD-002", productName: "제품 B", qtyOrdered: 50, qtyShipped: 50, amountKrw: 250000, amountUsd: 190 },
  { id: 3, code: "PRD-003", productName: "제품 C", qtyOrdered: 200, qtyShipped: 150, amountKrw: 1000000, amountUsd: 760 },
]

export const HeaderGroups: Story = {
  args: {
    data: orderData,
    columns: orderColumns,
    headerGroups: orderHeaderGroups,
  },
}

interface WideRow {
  id: number
  code: string
  name: string
  category: string
  q1: number
  q2: number
  q3: number
  q4: number
  total: number
  price: number
  status: string
}

const wideColumns: DataTableV2Column<WideRow>[] = [
  { accessorKey: "code", header: "코드", width: 100, pinned: "left" },
  { accessorKey: "name", header: "이름", width: 160, pinned: "left" },
  { accessorKey: "category", header: "카테고리", width: 140 },
  { accessorKey: "q1", header: "1분기", width: 100, align: "right" },
  { accessorKey: "q2", header: "2분기", width: 100, align: "right" },
  { accessorKey: "q3", header: "3분기", width: 100, align: "right" },
  { accessorKey: "q4", header: "4분기", width: 100, align: "right" },
  {
    accessorKey: "total",
    header: "합계",
    width: 120,
    align: "right",
    cell: (v) => (v as number).toLocaleString(),
  },
  {
    accessorKey: "price",
    header: "단가",
    width: 120,
    align: "right",
    cell: (v) => (v as number).toLocaleString(),
  },
  { accessorKey: "status", header: "상태", width: 100, pinned: "right", align: "center" },
]

const wideData: WideRow[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  code: `PRD-${String(i + 1).padStart(3, "0")}`,
  name: `제품 ${i + 1}`,
  category: ["의류", "가전", "식품", "생활"][i % 4],
  q1: Math.floor(Math.random() * 500),
  q2: Math.floor(Math.random() * 500),
  q3: Math.floor(Math.random() * 500),
  q4: Math.floor(Math.random() * 500),
  total: Math.floor(Math.random() * 2000),
  price: Math.floor(Math.random() * 100000),
  status: ["활성", "품절", "대기"][i % 3],
}))

export const PinnedColumns: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <DataTableV2 data={wideData} columns={wideColumns} maxHeight={400} />
    </div>
  ),
}

export const Resizable: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <DataTableV2 data={wideData} columns={wideColumns} maxHeight={400} resizable />
    </div>
  ),
}

const reorderableColumns: DataTableV2Column<Row>[] = [
  { accessorKey: "id", header: "ID", width: 60, align: "center" },
  { accessorKey: "name", header: "이름", width: 160 },
  { accessorKey: "role", header: "역할", width: 160 },
  {
    accessorKey: "score",
    header: "점수",
    width: 100,
    align: "right",
    cell: (v) => `${v}점`,
  },
]

export const Reorderable: Story = {
  render: () => (
    <DataTableV2 data={smallData} columns={reorderableColumns} columnReorderable />
  ),
}

export const ResizableAndReorderable: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <DataTableV2
        data={wideData}
        columns={wideColumns}
        maxHeight={400}
        resizable
        columnReorderable
      />
    </div>
  ),
}

export const Selectable: Story = {
  render: function Render() {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([2])
    return (
      <div className="flex flex-col gap-3">
        <span className="text-xs text-slate-500">
          선택된 ID: {selectedIds.join(", ") || "(없음)"}
        </span>
        <DataTableV2
          data={smallData}
          columns={columns}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    )
  },
}

export const OnRowClick: Story = {
  render: function Render() {
    const [clicked, setClicked] = useState<string | null>(null)
    return (
      <div className="flex flex-col gap-3">
        <span className="text-xs text-slate-500">
          클릭된 행: {clicked ?? "(없음)"}
        </span>
        <DataTableV2
          data={smallData}
          columns={columns}
          onRowClick={(row) => setClicked(`${row.name} (${row.role})`)}
        />
      </div>
    )
  },
}

export const RowClassName: Story = {
  args: {
    data: smallData,
    columns,
    rowClassName: (row) =>
      (row as Row).score >= 90 ? "!bg-green-50 dark:!bg-green-900/30" : "",
  },
}

const roleOptions = [
  { label: "매니저", value: "매니저" },
  { label: "엔지니어", value: "엔지니어" },
  { label: "디자이너", value: "디자이너" },
  { label: "PM", value: "PM" },
]

// columns 는 모듈 스코프 상수로 정의 — render 안에서 만들면 매 렌더마다 새 배열/객체가 되어
// 라이브러리 내부 memo 가 전부 무효화되고 전 행이 리렌더된다 (개발 문서 Gotcha 8).
// state 를 참조하지 않으므로 useMemo 대신 상수로 올리는 게 더 확실하다.
const editableColumns: DataTableV2Column<Row>[] = [
  { accessorKey: "id", header: "ID", width: 60, align: "center" },
  {
    accessorKey: "name",
    header: "이름 (Input 편집)",
    minWidth: 160,
    editable: true,
  },
  {
    accessorKey: "role",
    header: "역할 (Select 편집)",
    minWidth: 160,
    editable: true,
    editComponent: ({ value, onChange, onComplete }: EditComponentProps<Row>) => (
      <Select
        options={roleOptions}
        value={String(value)}
        onValueChange={(v) => {
          onChange(v as Row["role"])
          onComplete()
        }}
        size="full"
        aria-label="역할 선택"
      />
    ),
  },
  {
    accessorKey: "score",
    header: "점수 (0~100 검증)",
    width: 140,
    align: "right",
    editable: true,
    cell: (v) => `${v}점`,
    validate: (value) => {
      const num = Number(value)
      if (Number.isNaN(num)) return "숫자만 입력 가능합니다"
      if (num < 0 || num > 100) return "0 ~ 100 사이 값이어야 합니다"
      return true
    },
  },
]

export const EditableCells: Story = {
  render: function Render() {
    const [rows, setRows] = useState<Row[]>(smallData)
    return (
      <DataTableV2
        data={rows}
        columns={editableColumns}
        onCellChange={(rowId, columnKey, value) => {
          setRows((prev) =>
            prev.map((r) =>
              r.id === rowId
                ? { ...r, [columnKey]: columnKey === "score" ? Number(value) : value }
                : r
            )
          )
        }}
      />
    )
  },
}

export const Expandable: Story = {
  render: function Render() {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
    return (
      <div className="flex flex-col gap-3">
        <span className="text-xs text-slate-500">
          선택된 ID: {selectedIds.join(", ") || "(없음)"}
        </span>
        <DataTableV2
          data={smallData}
          columns={columns}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          expandable={{
            defaultExpandedRowIds: [1],
            expandedRowRender: (row) => (
              <div className="p-4 text-xs text-slate-700 dark:text-slate-200">
                <div className="font-medium mb-1">확장 상세</div>
                <div>이름: {(row as Row).name}</div>
                <div>역할: {(row as Row).role}</div>
                <div>점수: {(row as Row).score}</div>
              </div>
            ),
          }}
        />
      </div>
    )
  },
}

export const Loading: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div style={{ width: 720 }}>
          <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            splash 모드 (기본)
          </div>
          <DataTableV2 data={[]} columns={wideColumns} loading />
        </div>
        <div>
          <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            skeleton 모드
          </div>
          <DataTableV2 data={[]} columns={columns} loading loadingMode="skeleton" />
        </div>
        <div>
          <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            커스텀 loadingContent
          </div>
          <DataTableV2
            data={[]}
            columns={columns}
            loading
            loadingContent={
              <div className="text-sm text-blue-600 dark:text-blue-400">
                주문 데이터 조회 중...
              </div>
            }
          />
        </div>
      </div>
    )
  },
}

export const EmptyData: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            기본 빈 데이터 메시지
          </div>
          <DataTableV2 data={[]} columns={columns} />
        </div>
        <div>
          <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            커스텀 emptyMessage
          </div>
          <DataTableV2
            data={[]}
            columns={columns}
            emptyMessage={
              <div className="flex flex-col items-center gap-2">
                <div className="text-slate-500 dark:text-slate-400">
                  검색 결과가 없습니다.
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500">
                  다른 검색 조건을 시도해보세요.
                </div>
              </div>
            }
          />
        </div>
      </div>
    )
  },
}

export const RowActions: Story = {
  render: () => {
    const [rows, setRows] = useState<Row[]>(smallData)
    const handleAdd = () => {
      const nextId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1
      setRows((prev) => [
        ...prev,
        { id: nextId, name: `신규 ${nextId}`, role: "매니저", score: 80 },
      ])
    }
    const handleDelete = (row: Row) => {
      setRows((prev) => prev.filter((r) => r.id !== row.id))
    }
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          우측 삭제 아이콘 클릭 시 행 제거. 하단 추가 버튼 클릭 시 행 추가.
        </span>
        <DataTableV2
          data={rows}
          columns={columns}
          rowActions={{
            onRowAdd: handleAdd,
            onRowDelete: handleDelete,
          }}
        />
      </div>
    )
  },
}

export const RowReorderable: Story = {
  render: function Render() {
    const [rows, setRows] = useState<Row[]>(smallData)
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          왼쪽 드래그 핸들(≡)로 행 순서 변경. 순서는 로컬 state 로 반영.
        </span>
        <DataTableV2
          data={rows}
          columns={columns}
          rowReorderable
          onRowReorder={setRows}
        />
      </div>
    )
  },
}

export const RowReorderableWithSelection: Story = {
  render: function Render() {
    const [rows, setRows] = useState<Row[]>(smallData)
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          행 순서 변경 + 체크박스 선택 병행. 선택 상태는 데이터 이동 시에도 id 기준으로 유지.
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          선택된 ID: {selectedIds.join(", ") || "(없음)"}
        </span>
        <DataTableV2
          data={rows}
          columns={columns}
          rowReorderable
          onRowReorder={setRows}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    )
  },
}

const filterableColumns: DataTableV2Column<Row>[] = [
  {
    accessorKey: "id",
    header: "ID",
    width: 60,
    align: "center",
    filter: { type: "numberRange" },
  },
  {
    accessorKey: "name",
    header: "이름",
    minWidth: 120,
    filter: { type: "text", placeholder: "이름 검색" },
  },
  {
    accessorKey: "role",
    header: "역할",
    minWidth: 120,
    filter: {
      type: "multiSelect",
      options: [
        { label: "매니저", value: "매니저" },
        { label: "엔지니어", value: "엔지니어" },
        { label: "디자이너", value: "디자이너" },
        { label: "PM", value: "PM" },
      ],
      placeholder: "역할 선택",
    },
  },
  {
    accessorKey: "score",
    header: "점수",
    width: 100,
    align: "right",
    cell: (v) => `${v}점`,
    filter: { type: "numberRange" },
  },
]

export const ColumnFilterPresets: Story = {
  render: function Render() {
    const [filterState, setFilterState] = useState<Record<string, unknown>>({})
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          각 헤더의 필터 아이콘 클릭 → 팝오버 열림. text / multiSelect / numberRange 프리셋 예시.
        </span>
        <pre className="text-xs bg-slate-50 dark:bg-slate-800 rounded p-2 text-slate-700 dark:text-slate-200">
          filterState: {JSON.stringify(filterState)}
        </pre>
        <DataTableV2
          data={smallData}
          columns={filterableColumns}
          filterState={filterState}
          onFilterChange={setFilterState}
        />
      </div>
    )
  },
}

const customFilterColumns: DataTableV2Column<Row>[] = [
  { accessorKey: "id", header: "ID", width: 60, align: "center" },
  { accessorKey: "name", header: "이름", minWidth: 120 },
  {
    accessorKey: "role",
    header: "역할",
    minWidth: 120,
    filter: {
      type: "custom",
      component: ({ value, onChange, onClose }: FilterComponentProps<Row>) => {
        const roleOptions = [
          { label: "매니저", value: "매니저" },
          { label: "엔지니어", value: "엔지니어" },
          { label: "디자이너", value: "디자이너" },
          { label: "PM", value: "PM" },
        ]
        return (
          <div className="flex flex-col gap-2">
            <div className="text-xs font-medium text-slate-700 dark:text-slate-200">
              커스텀 필터 (Select + 즉시 적용)
            </div>
            <Select
              options={roleOptions}
              value={(value as string) ?? ""}
              onValueChange={(v) => {
                onChange(v || undefined)
                onClose()
              }}
              placeholder="역할 선택"
              clearable
              aria-label="역할 커스텀 필터"
            />
            <Button variant="ghost" size="sm" onClick={() => { onChange(undefined); onClose() }}>
              초기화
            </Button>
          </div>
        )
      },
    },
  },
  {
    accessorKey: "score",
    header: "점수",
    width: 100,
    align: "right",
    cell: (v) => `${v}점`,
  },
]

export const ColumnFilterCustom: Story = {
  render: function Render() {
    const [filterState, setFilterState] = useState<Record<string, unknown>>({})
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          역할 컬럼 헤더 필터에 커스텀 컴포넌트 (type: "custom") 로 Select 적용 — 값 선택 즉시 자동 닫힘.
        </span>
        <pre className="text-xs bg-slate-50 dark:bg-slate-800 rounded p-2 text-slate-700 dark:text-slate-200">
          filterState: {JSON.stringify(filterState)}
        </pre>
        <DataTableV2
          data={smallData}
          columns={customFilterColumns}
          filterState={filterState}
          onFilterChange={setFilterState}
        />
      </div>
    )
  },
}

export const ColumnFilterWithSort: Story = {
  render: function Render() {
    const [sortState, setSortState] = useState<SortState<Row>[]>([])
    const [filterState, setFilterState] = useState<Record<string, unknown>>({})
    // columns 는 useMemo 로 stable ref 유지 — 그렇지 않으면 매 렌더마다 새 배열/객체 →
    // 라이브러리 내부의 memo/useMemo 들이 무효화되어 헤더/row/셀 리렌더 폭발.
    const columnsSortableFilterable = useMemo<DataTableV2Column<Row>[]>(
      () => filterableColumns.map((c) => ({ ...c, sortable: true })),
      []
    )
    const sortedData = useMemo(() => sortRows(smallData, sortState), [sortState])
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          정렬 (헤더명 클릭) + 필터 (아이콘 클릭) + 리사이즈 (헤더 우측 경계 드래그) 모두 동시 조작.
        </span>
        <DataTableV2
          data={sortedData}
          columns={columnsSortableFilterable}
          sortState={sortState}
          onSortChange={setSortState}
          filterState={filterState}
          onFilterChange={setFilterState}
          resizable
        />
      </div>
    )
  },
}

// ============================================================================
// rowGrouping — 셀 병합 (v1 시맨틱 이식)
// 실무 케이스: B2B 주문 상세에서 상품ID 기준으로 상품 정보 컬럼 (코드/브랜드/상품명 등) 병합
// ============================================================================

interface GroupOrderRow {
  id: number
  goodsId: string
  goodsCode: string
  brandName: string
  goodsName: string
  unitPrice: number
  optionName: string
  qty: number
}

const groupOrderData: GroupOrderRow[] = [
  { id: 1, goodsId: "G001", goodsCode: "SKU-001", brandName: "브랜드A", goodsName: "티셔츠 화이트", unitPrice: 19000, optionName: "S", qty: 3 },
  { id: 2, goodsId: "G001", goodsCode: "SKU-001", brandName: "브랜드A", goodsName: "티셔츠 화이트", unitPrice: 19000, optionName: "M", qty: 5 },
  { id: 3, goodsId: "G001", goodsCode: "SKU-001", brandName: "브랜드A", goodsName: "티셔츠 화이트", unitPrice: 19000, optionName: "L", qty: 2 },
  { id: 4, goodsId: "G002", goodsCode: "SKU-002", brandName: "브랜드B", goodsName: "청바지 다크블루", unitPrice: 49000, optionName: "28", qty: 4 },
  { id: 5, goodsId: "G002", goodsCode: "SKU-002", brandName: "브랜드B", goodsName: "청바지 다크블루", unitPrice: 49000, optionName: "30", qty: 6 },
  { id: 6, goodsId: "G003", goodsCode: "SKU-003", brandName: "브랜드C", goodsName: "운동화 그레이", unitPrice: 89000, optionName: "270", qty: 1 },
]

const groupOrderColumns: DataTableV2Column<GroupOrderRow>[] = [
  { accessorKey: "goodsCode", header: "상품코드", width: 120, align: "center" },
  { accessorKey: "brandName", header: "브랜드", width: 100 },
  { accessorKey: "goodsName", header: "상품명", minWidth: 160 },
  { accessorKey: "unitPrice", header: "단가", width: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}원` },
  { accessorKey: "optionName", header: "옵션", width: 80, align: "center" },
  { accessorKey: "qty", header: "수량", width: 80, align: "right" },
]

export const RowGrouping: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        `goodsId` 기준으로 그룹핑 — 상품 정보 컬럼 (코드/브랜드/상품명/단가) 이 rowSpan 으로 병합. 옵션/수량은 개별 렌더.
      </span>
      <DataTableV2
        data={groupOrderData}
        columns={groupOrderColumns}
        rowGrouping={{
          groupBy: "goodsId",
          mergeColumns: ["goodsCode", "brandName", "goodsName", "unitPrice"],
        }}
      />
    </div>
  ),
}

export const RowGroupingWithSelection: Story = {
  render: function Render() {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          rowGrouping + selectable 조합. 선택은 개별 row 단위. 삭제 액션도 같이.
        </span>
        <DataTableV2
          data={groupOrderData}
          columns={groupOrderColumns}
          rowGrouping={{
            groupBy: "goodsId",
            mergeColumns: ["goodsCode", "brandName", "goodsName", "unitPrice"],
          }}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          rowActions={{ onRowDelete: (row) => alert(`삭제: ${row.optionName} × ${row.qty}`) }}
        />
      </div>
    )
  },
}

// ============================================================================
// virtual — 행 가상화 (SDS-38)
// 대용량 데이터에서 viewport 안의 row 만 렌더. @tanstack/react-virtual 기반.
// ============================================================================

const virtualLargeData: Row[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `사용자 ${i + 1}`,
  role: ["매니저", "엔지니어", "디자이너", "PM"][i % 4],
  score: 50 + ((i * 17) % 50),
}))

export const Virtualized: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        10,000 rows. `virtual` prop 활성 → viewport 안 (+ overscan) 만 DOM 렌더. 스크롤 부드럽게 동작.
      </span>
      <DataTableV2
        data={virtualLargeData}
        columns={columns}
        maxHeight={400}
        virtual
      />
    </div>
  ),
}

export const VirtualizedWithConfig: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        virtual 옵션 커스텀: overscan 20 (스크롤 blank flash 감소), estimateSize 36 (row 예상 높이).
      </span>
      <DataTableV2
        data={virtualLargeData}
        columns={columns}
        maxHeight={400}
        virtual={{ overscan: 20, estimateSize: 36 }}
      />
    </div>
  ),
}

// Virtualized + rowGrouping — 그룹 head 는 overscan 확장으로 강제 렌더 보장.
// 큰 그룹 (예: 100 개 이상 span) 이 overscan 범위 넘으면 head 안 보일 가능성 있음. 대부분 케이스는 커버.
const virtualGroupedData: GroupOrderRow[] = Array.from({ length: 100 }, (_, groupIdx) => {
  const goodsId = `G${String(groupIdx + 1).padStart(3, "0")}`
  const goodsCode = `SKU-${String(groupIdx + 1).padStart(3, "0")}`
  const brandName = `브랜드${String.fromCharCode(65 + (groupIdx % 26))}`
  const goodsName = `상품 ${groupIdx + 1}`
  const unitPrice = 10000 + (groupIdx * 1000)
  return Array.from({ length: 5 }, (_, subIdx) => ({
    id: groupIdx * 5 + subIdx + 1,
    goodsId,
    goodsCode,
    brandName,
    goodsName,
    unitPrice,
    optionName: ["S", "M", "L", "XL", "XXL"][subIdx],
    qty: (subIdx + 1) * 2,
  }))
}).flat()

export const VirtualizedWithRowGrouping: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-slate-500 dark:text-slate-400">
        500 rows (100 그룹 × 5 옵션). virtual + rowGrouping 조합. 그룹 head 는 viewport 밖이어도 강제 렌더 (overscan 확장).
      </span>
      <DataTableV2
        data={virtualGroupedData}
        columns={groupOrderColumns}
        maxHeight={400}
        virtual
        rowGrouping={{
          groupBy: "goodsId",
          mergeColumns: ["goodsCode", "brandName", "goodsName", "unitPrice"],
        }}
      />
    </div>
  ),
}

