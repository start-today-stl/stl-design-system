import type { Meta, StoryObj } from "@storybook/react-vite"
import { TableContainer, TableToolbar, PaginationFooter, DataTable, type DataTableColumn } from "../src/components/table"
import { Button } from "../src/components/ui/button"
import { Badge } from "../src/components/ui/badge"

const meta = {
  title: "Table/TableContainer",
  component: TableContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TableContainer>

export default meta
type Story = StoryObj<typeof meta>

// 샘플 데이터
interface Product {
  id: number
  name: string
  category: string
  price: number
  status: "판매중" | "품절" | "준비중"
}

const sampleData: Product[] = [
  { id: 1, name: "상품 A", category: "전자기기", price: 50000, status: "판매중" },
  { id: 2, name: "상품 B", category: "의류", price: 35000, status: "품절" },
  { id: 3, name: "상품 C", category: "식품", price: 12000, status: "판매중" },
  { id: 4, name: "상품 D", category: "가구", price: 250000, status: "준비중" },
  { id: 5, name: "상품 E", category: "도서", price: 18000, status: "판매중" },
]

const columns: DataTableColumn<Product>[] = [
  { accessorKey: "id", header: "ID", width: 60 },
  { accessorKey: "name", header: "상품명", minWidth: 150 },
  { accessorKey: "category", header: "카테고리", minWidth: 100 },
  {
    accessorKey: "price",
    header: "가격",
    minWidth: 100,
    align: "right",
    cell: (v) => `${(v as number).toLocaleString()}원`,
  },
  {
    accessorKey: "status",
    header: "상태",
    width: 100,
    cell: (value) => (
      <Badge
        variant={
          value === "판매중"
            ? "success-light"
            : value === "품절"
              ? "danger-light"
              : "info-light"
        }
      >
        {value as string}
      </Badge>
    ),
  },
]

/** 기본 테이블 컨테이너 (Toolbar + Table + Pagination) */
export const Default: Story = {
  render: () => (
    <TableContainer>
      <TableToolbar totalCount={87} selectedCount={0}>
        <Button variant="ghost" size="sm">엑셀 다운로드</Button>
      </TableToolbar>
      <DataTable columns={columns} data={sampleData} />
      <PaginationFooter
        currentPage={1}
        totalPages={9}
        pageSize={10}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </TableContainer>
  ),
}

/** 선택 가능한 테이블 */
export const WithSelection: Story = {
  render: () => (
    <TableContainer>
      <TableToolbar totalCount={87} selectedCount={2}>
        <Button variant="danger" size="sm">선택 삭제</Button>
        <Button variant="ghost" size="sm">엑셀 다운로드</Button>
      </TableToolbar>
      <DataTable
        columns={columns}
        data={sampleData}
        selectable
        selectedIds={[1, 3]}
        onSelectionChange={() => {}}
      />
      <PaginationFooter
        currentPage={1}
        totalPages={9}
        pageSize={10}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </TableContainer>
  ),
}

/** 툴바 없이 */
export const WithoutToolbar: Story = {
  render: () => (
    <TableContainer>
      <DataTable columns={columns} data={sampleData} />
      <PaginationFooter
        currentPage={1}
        totalPages={9}
        pageSize={10}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </TableContainer>
  ),
}

/** 페이지네이션 없이 */
export const WithoutPagination: Story = {
  render: () => (
    <TableContainer>
      <TableToolbar totalCount={5}>
        <Button variant="ghost" size="sm">엑셀 다운로드</Button>
      </TableToolbar>
      <DataTable columns={columns} data={sampleData} />
    </TableContainer>
  ),
}

/** 테이블만 */
export const TableOnly: Story = {
  render: () => (
    <TableContainer>
      <DataTable columns={columns} data={sampleData} />
    </TableContainer>
  ),
}
