import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortableHead,
  TableToolbar,
  PaginationFooter,
  type SortDirection,
} from "../src/components/table"
import { Checkbox } from "../src/components/ui/checkbox"
import { Button } from "../src/components/ui/button"

const meta = {
  title: "Table/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

// 샘플 데이터
const sampleData = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자", status: "활성" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자", status: "활성" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자", status: "비활성" },
  { id: 4, name: "박민수", email: "park@example.com", role: "편집자", status: "활성" },
  { id: 5, name: "정수진", email: "jung@example.com", role: "사용자", status: "활성" },
]

/** 기본 테이블 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

/** 체크박스 선택 */
export const WithCheckbox: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const isAllSelected = selectedIds.length === sampleData.length
    const isIndeterminate = selectedIds.length > 0 && !isAllSelected

    const toggleAll = () => {
      if (isAllSelected) {
        setSelectedIds([])
      } else {
        setSelectedIds(sampleData.map((row) => row.id))
      }
    }

    const toggleRow = (id: number) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onCheckedChange={toggleAll}
                aria-label="전체 선택"
              />
            </TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow
              key={row.id}
              data-state={selectedIds.includes(row.id) ? "selected" : undefined}
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(row.id)}
                  onCheckedChange={() => toggleRow(row.id)}
                  aria-label={`${row.name} 선택`}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}

/** 정렬 가능한 헤더 */
export const WithSortableHeaders: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>(null)

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        // 같은 컬럼 클릭: asc → desc → null 순환
        if (sortDirection === "asc") {
          setSortDirection("desc")
        } else if (sortDirection === "desc") {
          setSortDirection(null)
          setSortColumn(null)
        } else {
          setSortDirection("asc")
        }
      } else {
        // 다른 컬럼 클릭: asc로 시작
        setSortColumn(column)
        setSortDirection("asc")
      }
    }

    const getSortDirection = (column: string): SortDirection => {
      return sortColumn === column ? sortDirection : null
    }

    // 정렬된 데이터
    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortColumn || !sortDirection) return 0
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortDirection === "asc" ? comparison : -comparison
    })

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          정렬: {sortColumn ? `${sortColumn} (${sortDirection})` : "없음"}
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableSortableHead
                sortDirection={getSortDirection("name")}
                onSort={() => handleSort("name")}
              >
                이름
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("email")}
                onSort={() => handleSort("email")}
              >
                이메일
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("role")}
                onSort={() => handleSort("role")}
              >
                역할
              </TableSortableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
}

/** 풀 테이블 (툴바 + 체크박스 + 정렬 + 페이지네이션) */
export const FullTable: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // 더 많은 샘플 데이터
    const allData = Array.from({ length: 68 }, (_, i) => ({
      id: i + 1,
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "관리자" : i % 3 === 1 ? "편집자" : "사용자",
      status: i % 4 === 0 ? "비활성" : "활성",
    }))

    const totalPages = Math.ceil(allData.length / pageSize)

    // 정렬
    const sortedData = [...allData].sort((a, b) => {
      if (!sortColumn || !sortDirection) return 0
      const aValue = a[sortColumn as keyof typeof a]
      const bValue = b[sortColumn as keyof typeof b]
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortDirection === "asc" ? comparison : -comparison
    })

    // 페이지네이션
    const paginatedData = sortedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )

    const isAllSelected =
      paginatedData.length > 0 &&
      paginatedData.every((row) => selectedIds.includes(row.id))
    const isIndeterminate =
      paginatedData.some((row) => selectedIds.includes(row.id)) && !isAllSelected

    const toggleAll = () => {
      if (isAllSelected) {
        setSelectedIds((prev) =>
          prev.filter((id) => !paginatedData.some((row) => row.id === id))
        )
      } else {
        setSelectedIds((prev) => [
          ...prev,
          ...paginatedData.map((row) => row.id).filter((id) => !prev.includes(id)),
        ])
      }
    }

    const toggleRow = (id: number) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
    }

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        if (sortDirection === "asc") {
          setSortDirection("desc")
        } else if (sortDirection === "desc") {
          setSortDirection(null)
          setSortColumn(null)
        } else {
          setSortDirection("asc")
        }
      } else {
        setSortColumn(column)
        setSortDirection("asc")
      }
    }

    const getSortDirection = (column: string): SortDirection => {
      return sortColumn === column ? sortDirection : null
    }

    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        {/* 툴바 */}
        <TableToolbar totalCount={allData.length} selectedCount={selectedIds.length}>
          <Button variant="danger" disabled={selectedIds.length === 0}>
            삭제
          </Button>
          <Button variant="ghost">다운로드</Button>
          <Button variant="ghost">업로드</Button>
        </TableToolbar>

        {/* 테이블 */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onCheckedChange={toggleAll}
                  aria-label="전체 선택"
                />
              </TableHead>
              <TableSortableHead
                sortDirection={getSortDirection("name")}
                onSort={() => handleSort("name")}
              >
                이름
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("email")}
                onSort={() => handleSort("email")}
              >
                이메일
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("role")}
                onSort={() => handleSort("role")}
              >
                역할
              </TableSortableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                data-state={selectedIds.includes(row.id) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onCheckedChange={() => toggleRow(row.id)}
                    aria-label={`${row.name} 선택`}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 페이지네이션 */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={allData.length}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
          previousLabel="Previous"
          nextLabel="Next"
          formatItemRange={(start, end, total) =>
            `Showing ${start}-${end} of ${total}`
          }
        />
      </div>
    )
  },
}
