import { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  DataTableV2,
  type DataTableV2Column,
  type EditComponentProps,
  type HeaderGroup,
  type SortState,
} from "../src/components/table/data-table-v2"
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

export const EditableCells: Story = {
  render: function Render() {
    const [rows, setRows] = useState<Row[]>(smallData)
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
