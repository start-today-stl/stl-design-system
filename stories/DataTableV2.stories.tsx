import { useMemo, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  DataTableV2,
  type DataTableV2Column,
  type HeaderGroup,
  type SortState,
} from "../src/components/table/data-table-v2"

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
  { accessorKey: "role", header: "역할", minWidth: 120 },
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
