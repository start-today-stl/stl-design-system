import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState, useMemo } from "react"
import {
  DataTable,
  TableToolbar,
  Pagination,
  PageSizeSelector,
  type DataTableColumn,
  type SortState,
  type EditComponentProps,
  type HeaderGroup,
  type RowGroupConfig,
} from "../src/components/table"
import { Button } from "../src/components/ui/button"
import { Badge } from "../src/components/ui/badge"
import { Select } from "../src/components/ui/select"

// 샘플 데이터 타입
interface User {
  id: number
  name: string
  email: string
  role: string
  status: "활성" | "비활성"
}

// 샘플 데이터
const sampleData: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자", status: "활성" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자", status: "활성" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자", status: "비활성" },
  { id: 4, name: "박민수", email: "park@example.com", role: "편집자", status: "활성" },
  { id: 5, name: "정수진", email: "jung@example.com", role: "사용자", status: "활성" },
]

// 컬럼 정의
const columns: DataTableColumn<User>[] = [
  { accessorKey: "name", header: "이름", sortable: true },
  { accessorKey: "email", header: "이메일", sortable: true },
  { accessorKey: "role", header: "역할", sortable: true },
  {
    accessorKey: "status",
    header: "상태",
    cell: (value) => (
      <Badge variant={value === "활성" ? "success-light" : "danger-light"}>
        {value as string}
      </Badge>
    ),
  },
]

const meta: Meta = {
  title: "Table/DataTable",
  component: DataTable,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

/** 기본 테이블 */
export const Default: Story = {
  render: () => <DataTable columns={columns} data={sampleData} />,
}

/** 선택 가능 */
export const Selectable: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          선택됨: {selectedIds.length > 0 ? selectedIds.join(", ") : "없음"}
        </p>
        <DataTable
          columns={columns}
          data={sampleData}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
        />
      </div>
    )
  },
}

/** 정렬 가능 */
export const Sortable: Story = {
  render: () => {
    const [sortState, setSortState] = useState<SortState<User>>({
      column: null,
      direction: null,
    })

    // 정렬된 데이터
    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortState.column || !sortState.direction) return 0
      const aValue = a[sortState.column]
      const bValue = b[sortState.column]
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortState.direction === "asc" ? comparison : -comparison
    })

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          정렬: {sortState.column ? `${String(sortState.column)} (${sortState.direction})` : "없음"}
        </p>
        <DataTable
          columns={columns}
          data={sortedData}
          sortState={sortState}
          onSortChange={setSortState}
        />
      </div>
    )
  },
}

/** 커스텀 셀 렌더러 */
export const CustomCell: Story = {
  render: () => {
    const customColumns: DataTableColumn<User>[] = [
      {
        accessorKey: "name",
        header: "이름",
        cell: (value, row) => (
          <div className="flex flex-col">
            <span className="font-medium">{value as string}</span>
            <span className="text-xs text-slate-400">{row.email}</span>
          </div>
        ),
      },
      { accessorKey: "role", header: "역할" },
      {
        accessorKey: "status",
        header: "상태",
        align: "center",
        cell: (value) => (
          <Badge variant={value === "활성" ? "success-light" : "danger-light"}>
            {value as string}
          </Badge>
        ),
      },
    ]

    return <DataTable columns={customColumns} data={sampleData} />
  },
}

/** 빈 데이터 */
export const Empty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      emptyMessage="검색 결과가 없습니다."
    />
  ),
}

/** 로딩 상태 (커스텀) */
export const LoadingCustom: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      loading
      loadingContent={
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full" />
          <span className="text-sm text-slate-500">데이터를 불러오는 중...</span>
        </div>
      }
    />
  ),
}

/** 로딩 상태 (기본: 툴바 + 페이지네이션 포함) */
export const Loading: Story = {
  render: () => (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {/* 툴바 */}
      <TableToolbar totalCount={0} selectedCount={0}>
        <Button variant="danger" disabled>삭제</Button>
        <Button variant="ghost">다운로드</Button>
      </TableToolbar>

      {/* 데이터 테이블 - 로딩 상태 */}
      <DataTable
        columns={columns}
        data={[]}
        loading
        selectable
      />

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          previousLabel="Previous"
          nextLabel="Next"
        />
        <PageSizeSelector
          pageSize={10}
          onPageSizeChange={() => {}}
        />
      </div>
    </div>
  ),
}

/** 행 클릭 */
export const RowClick: Story = {
  render: () => {
    const [clickedRow, setClickedRow] = useState<User | null>(null)

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          클릭한 행: {clickedRow ? clickedRow.name : "없음"}
        </p>
        <DataTable
          columns={columns}
          data={sampleData}
          onRowClick={setClickedRow}
        />
      </div>
    )
  },
}

/** 편집 가능 (기본 Input) */
export const Editable: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([...sampleData])
    const [lastChange, setLastChange] = useState<string>("")

    const editableColumns: DataTableColumn<User>[] = [
      { accessorKey: "name", header: "이름", editable: true },
      { accessorKey: "email", header: "이메일", editable: true },
      { accessorKey: "role", header: "역할" },
      {
        accessorKey: "status",
        header: "상태",
        cell: (value) => (
          <Badge variant={value === "활성" ? "success-light" : "danger-light"}>
            {value as string}
          </Badge>
        ),
      },
    ]

    const handleCellChange = (
      rowId: string | number,
      columnKey: keyof User,
      value: User[keyof User]
    ) => {
      setData((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, [columnKey]: value } : row
        )
      )
      setLastChange(`Row ${rowId}, ${String(columnKey)}: "${value}"`)
    }

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          마지막 변경: {lastChange || "없음"}
        </p>
        <p className="mb-4 text-xs text-slate-400">
          셀을 클릭하여 편집하세요. Enter로 저장, Escape 또는 다른 곳 클릭으로 취소.
        </p>
        <DataTable
          columns={editableColumns}
          data={data}
          onCellChange={handleCellChange}
        />
      </div>
    )
  },
}

/** 편집 가능 (커스텀 에디터: Select) */
export const EditableWithCustomEditor: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([...sampleData])

    // 역할 선택용 커스텀 에디터
    const RoleSelectEditor = ({
      value,
      onChange,
      onComplete,
    }: EditComponentProps<User>) => {
      const roleOptions = [
        { label: "관리자", value: "관리자" },
        { label: "편집자", value: "편집자" },
        { label: "사용자", value: "사용자" },
      ]

      return (
        <Select
          value={String(value)}
          onValueChange={(newValue) => {
            onChange(newValue as User[keyof User])
            // Select는 선택 즉시 완료
            setTimeout(onComplete, 0)
          }}
          options={roleOptions}
          size="sm"
          className="w-full"
          tableMode
        />
      )
    }

    // 상태 선택용 커스텀 에디터
    const StatusSelectEditor = ({
      value,
      onChange,
      onComplete,
    }: EditComponentProps<User>) => {
      const statusOptions = [
        { label: "활성", value: "활성" },
        { label: "비활성", value: "비활성" },
      ]

      return (
        <Select
          value={String(value)}
          onValueChange={(newValue) => {
            onChange(newValue as User[keyof User])
            setTimeout(onComplete, 0)
          }}
          options={statusOptions}
          size="sm"
          className="w-full"
          tableMode
        />
      )
    }

    const editableColumns: DataTableColumn<User>[] = [
      { accessorKey: "name", header: "이름", editable: true },
      { accessorKey: "email", header: "이메일", editable: true },
      {
        accessorKey: "role",
        header: "역할",
        editable: true,
        editComponent: RoleSelectEditor,
      },
      {
        accessorKey: "status",
        header: "상태",
        editable: true,
        editComponent: StatusSelectEditor,
        cell: (value) => (
          <Badge variant={value === "활성" ? "success-light" : "danger-light"}>
            {value as string}
          </Badge>
        ),
      },
    ]

    const handleCellChange = (
      rowId: string | number,
      columnKey: keyof User,
      value: User[keyof User]
    ) => {
      setData((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, [columnKey]: value } : row
        )
      )
    }

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          역할과 상태 컬럼은 Select로 편집됩니다.
        </p>
        <DataTable
          columns={editableColumns}
          data={data}
          onCellChange={handleCellChange}
        />
      </div>
    )
  },
}

/** 편집 가능 (검증) */
export const EditableWithValidation: Story = {
  render: () => {
    const [data, setData] = useState<User[]>([...sampleData])

    const editableColumns: DataTableColumn<User>[] = [
      {
        accessorKey: "name",
        header: "이름",
        editable: true,
        validate: (value) => {
          if (!value || String(value).trim() === "") {
            return "이름을 입력해주세요"
          }
          if (String(value).length < 2) {
            return "이름은 2자 이상이어야 합니다"
          }
          return true
        },
      },
      {
        accessorKey: "email",
        header: "이메일",
        editable: true,
        validate: (value) => {
          if (!value || String(value).trim() === "") {
            return "이메일을 입력해주세요"
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(String(value))) {
            return "올바른 이메일 형식이 아닙니다"
          }
          return true
        },
      },
      { accessorKey: "role", header: "역할" },
      { accessorKey: "status", header: "상태" },
    ]

    const handleCellChange = (
      rowId: string | number,
      columnKey: keyof User,
      value: User[keyof User]
    ) => {
      setData((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, [columnKey]: value } : row
        )
      )
    }

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          이름(필수, 2자 이상), 이메일(필수, 형식 검증)에 검증이 적용됩니다.
          빈 값이나 잘못된 형식 입력 시 에러 메시지가 표시됩니다.
        </p>
        <DataTable
          columns={editableColumns}
          data={data}
          onCellChange={handleCellChange}
        />
      </div>
    )
  },
}

/** 고정 컬럼 (Sticky Column) */
export const StickyColumn: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    interface Item {
      id: number
      code: string
      name: string
      col1: string
      col2: string
      col3: string
      col4: string
      status: string
    }

    const items: Item[] = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      code: `CODE-${i + 1}`,
      name: `아이템 ${i + 1}`,
      col1: `데이터 A${i + 1}`,
      col2: `데이터 B${i + 1}`,
      col3: `데이터 C${i + 1}`,
      col4: `데이터 D${i + 1}`,
      status: i % 2 === 0 ? "활성" : "비활성",
    }))

    const itemColumns: DataTableColumn<Item>[] = [
      { accessorKey: "code", header: "코드", width: 100, sticky: "left" },
      { accessorKey: "name", header: "이름", minWidth: 120 },
      { accessorKey: "col1", header: "컬럼1", minWidth: 100 },
      { accessorKey: "col2", header: "컬럼2", minWidth: 100 },
      { accessorKey: "col3", header: "컬럼3", minWidth: 100 },
      { accessorKey: "col4", header: "컬럼4", minWidth: 100 },
      {
        accessorKey: "status",
        header: "상태",
        width: 100,
        sticky: "right",
        cell: (value) => (
          <Badge variant={value === "활성" ? "success-light" : "danger-light"}>
            {value as string}
          </Badge>
        ),
      },
    ]

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          선택됨: {selectedIds.length > 0 ? selectedIds.join(", ") : "없음"}
        </p>
        <p className="mb-4 text-xs text-slate-400">
          체크박스와 코드 컬럼이 왼쪽 고정, 상태 컬럼이 오른쪽 고정입니다.
        </p>
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <DataTable
            columns={itemColumns}
            data={items}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={(ids) => setSelectedIds(ids as number[])}
          />
        </div>
      </div>
    )
  },
}

/** 확장 가능한 행 */
export const Expandable: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    // 간단한 데이터
    interface Task {
      id: number
      title: string
      assignee: string
      subtasks: { id: number; title: string; done: boolean }[]
    }

    const tasks: Task[] = [
      {
        id: 1,
        title: "프로젝트 기획",
        assignee: "김철수",
        subtasks: [
          { id: 11, title: "요구사항 정리", done: true },
          { id: 12, title: "일정 수립", done: false },
        ],
      },
      {
        id: 2,
        title: "디자인",
        assignee: "이영희",
        subtasks: [
          { id: 21, title: "와이어프레임", done: true },
          { id: 22, title: "시안 작업", done: true },
          { id: 23, title: "디자인 시스템", done: false },
        ],
      },
      {
        id: 3,
        title: "개발",
        assignee: "박민수",
        subtasks: [
          { id: 31, title: "프론트엔드", done: false },
          { id: 32, title: "백엔드", done: false },
        ],
      },
    ]

    const taskColumns: DataTableColumn<Task>[] = [
      { accessorKey: "title", header: "작업명" },
      { accessorKey: "assignee", header: "담당자" },
    ]

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          선택됨: {selectedIds.length > 0 ? selectedIds.join(", ") : "없음"}
        </p>
        <DataTable
          columns={taskColumns}
          data={tasks}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
          expandable={{
            expandedRowRender: (row) => (
              <div className="pl-4">
                <p className="text-xs font-medium text-slate-500 mb-2">하위 작업</p>
                <ul className="space-y-1">
                  {row.subtasks.map((subtask) => (
                    <li key={subtask.id} className="flex items-center gap-2 text-sm">
                      <span className={subtask.done ? "text-green-500" : "text-slate-400"}>
                        {subtask.done ? "✓" : "○"}
                      </span>
                      <span className={subtask.done ? "line-through text-slate-400" : ""}>
                        {subtask.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          }}
        />
      </div>
    )
  },
}

/** 기본 목록 페이지 패턴 (툴바 + 선택 + 정렬 + 페이지네이션) */
export const ListPageBasic: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [sortState, setSortState] = useState<SortState<User>>({
      column: null,
      direction: null,
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // 더 많은 샘플 데이터
    const allData: User[] = Array.from({ length: 68 }, (_, i) => ({
      id: i + 1,
      name: `사용자 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "관리자" : i % 3 === 1 ? "편집자" : "사용자",
      status: i % 4 === 0 ? "비활성" : "활성",
    }))

    const totalPages = Math.ceil(allData.length / pageSize)

    // 정렬
    const sortedData = [...allData].sort((a, b) => {
      if (!sortState.column || !sortState.direction) return 0
      const aValue = a[sortState.column]
      const bValue = b[sortState.column]
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortState.direction === "asc" ? comparison : -comparison
    })

    // 페이지네이션
    const paginatedData = sortedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )

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

        {/* 데이터 테이블 */}
        <DataTable
          columns={columns}
          data={paginatedData}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
          sortState={sortState}
          onSortChange={setSortState}
        />

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            previousLabel="Previous"
            nextLabel="Next"
          />
          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setCurrentPage(1)
            }}
          />
        </div>
      </div>
    )
  },
}

/** 모든 기능 조합 (Sticky + 선택 + 편집 + 검증 + 확장 + 페이지네이션 + maxHeight) */
export const AllFeatures: Story = {
  render: () => {
    // 상품 옵션 타입
    interface ProductOption {
      id: number
      name: string
      additionalPrice: number
      stock: number
    }

    // 상품 데이터 타입
    interface Product {
      id: number
      sku: string
      name: string
      category: string
      price: number
      stock: number
      status: "판매중" | "품절" | "준비중"
      options: ProductOption[]
    }

    // 상품 데이터 (50개)
    const initialProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      sku: `SKU-${String(i + 1).padStart(4, "0")}`,
      name: `상품 ${i + 1}`,
      category: ["전자기기", "의류", "식품", "가구", "도서"][i % 5],
      price: (i + 1) * 1000 + Math.floor(Math.random() * 9000),
      stock: Math.floor(Math.random() * 100),
      status: i % 5 === 0 ? "품절" : i % 7 === 0 ? "준비중" : "판매중",
      options: i % 3 === 0 ? [] : Array.from({ length: (i % 3) + 1 }, (_, j) => ({
        id: i * 10 + j + 1,
        name: ["기본", "대용량", "프리미엄"][j] || `옵션 ${j + 1}`,
        additionalPrice: j * 1000,
        stock: Math.floor(Math.random() * 50),
      })),
    }))

    const [products, setProducts] = useState(initialProducts)
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [sortState, setSortState] = useState<SortState<Product>>({
      column: null,
      direction: null,
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const totalPages = Math.ceil(products.length / pageSize)

    // 정렬
    const sortedData = [...products].sort((a, b) => {
      if (!sortState.column || !sortState.direction) return 0
      const aValue = a[sortState.column]
      const bValue = b[sortState.column]
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortState.direction === "asc" ? aValue - bValue : bValue - aValue
      }
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortState.direction === "asc" ? comparison : -comparison
    })

    // 페이지네이션
    const paginatedData = sortedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )

    // 셀 변경 핸들러
    const handleCellChange = (
      rowId: string | number,
      columnKey: keyof Product,
      value: Product[keyof Product]
    ) => {
      setProducts((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, [columnKey]: value } : row
        )
      )
    }

    // 컬럼 정의
    const productColumns: DataTableColumn<Product>[] = [
      // 왼쪽 고정 컬럼
      { accessorKey: "sku", header: "SKU", width: 120, sticky: "left" },
      {
        accessorKey: "name",
        header: "상품명",
        width: 180,
        sticky: "left",
        editable: true,
        validate: (value) => {
          if (!value || String(value).trim() === "") return "필수 입력"
          if (String(value).length < 2) return "2자 이상"
          return true
        },
      },
      // 스크롤되는 컬럼
      { accessorKey: "category", header: "카테고리", minWidth: 100, sortable: true },
      {
        accessorKey: "price",
        header: "가격",
        minWidth: 120,
        align: "right",
        sortable: true,
        editable: true,
        cell: (v) => `${(v as number).toLocaleString()}원`,
        validate: (value) => {
          const num = Number(value)
          if (isNaN(num)) return "숫자만 입력"
          if (num < 0) return "0 이상"
          return true
        },
      },
      {
        accessorKey: "stock",
        header: "재고",
        minWidth: 80,
        align: "center",
        sortable: true,
        editable: true,
        validate: (value) => {
          const num = Number(value)
          if (isNaN(num)) return "숫자만 입력"
          if (num < 0) return "0 이상"
          return true
        },
      },
      // 오른쪽 고정 컬럼
      {
        accessorKey: "status",
        header: "상태",
        width: 100,
        sticky: "right",
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

    // 선택 삭제 핸들러
    const handleDelete = () => {
      setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)))
      setSelectedIds([])
    }

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          SKU/상품명은 왼쪽 고정, 상태는 오른쪽 고정. 상품명/가격/재고는 편집 가능. 옵션이 있는 상품은 확장 가능. maxHeight=400 적용.
        </p>
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          {/* 툴바 */}
          <TableToolbar totalCount={products.length} selectedCount={selectedIds.length}>
            <Button variant="danger" disabled={selectedIds.length === 0} onClick={handleDelete}>
              삭제
            </Button>
            <Button variant="ghost">내보내기</Button>
          </TableToolbar>

          {/* 데이터 테이블 */}
          <DataTable
            columns={productColumns}
            data={paginatedData}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={(ids) => setSelectedIds(ids as number[])}
            sortState={sortState}
            onSortChange={setSortState}
            onCellChange={handleCellChange}
            maxHeight={400}
            expandable={{
              rowExpandable: (row) => row.options.length > 0,
              expandedRowRender: (row) => (
                <div className="py-2 px-4">
                  <p className="text-xs font-medium text-slate-500 mb-2">상품 옵션</p>
                  <div className="grid grid-cols-4 gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="font-medium">옵션명</div>
                    <div className="font-medium text-right">추가금액</div>
                    <div className="font-medium text-center">재고</div>
                    <div></div>
                  </div>
                  {row.options.map((option) => (
                    <div key={option.id} className="grid grid-cols-4 gap-2 text-xs py-1 border-t border-slate-100 dark:border-slate-800">
                      <div>{option.name}</div>
                      <div className="text-right">+{option.additionalPrice.toLocaleString()}원</div>
                      <div className="text-center">{option.stock}개</div>
                      <div className="text-right">
                        <button className="text-blue-500 hover:underline">수정</button>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            }}
          />

          {/* 페이지네이션 */}
          <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              previousLabel="이전"
              nextLabel="다음"
            />
            <PageSizeSelector
              pageSize={pageSize}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>
      </div>
    )
  },
}

/** 컬럼 리사이징 */
export const Resizable: Story = {
  render: () => {
    interface ControlledItem {
      id: number
      code: string
      title: string
      description: string
      createdAt: string
    }

    const items: ControlledItem[] = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      code: `CODE-${i + 1}`,
      title: `항목 ${i + 1}`,
      description: `이것은 항목 ${i + 1}의 설명입니다.`,
      createdAt: `2024-01-${String(i + 10).padStart(2, "0")}`,
    }))

    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
      code: 100,
      title: 150,
      description: 250,
      createdAt: 120,
    })

    const handleColumnResize = (columnKey: keyof ControlledItem, width: number) => {
      setColumnWidths((prev) => ({ ...prev, [String(columnKey)]: width }))
    }

    const controlledColumns: DataTableColumn<ControlledItem>[] = [
      { accessorKey: "code", header: "코드", width: 100 },
      { accessorKey: "title", header: "제목", width: 150 },
      { accessorKey: "description", header: "설명", width: 250 },
      { accessorKey: "createdAt", header: "생성일", width: 120 },
    ]

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          컬럼 너비가 외부 상태로 관리됩니다. 현재 너비:
        </p>
        <div className="mb-4 text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
          {JSON.stringify(columnWidths)}
        </div>
        <DataTable
          columns={controlledColumns}
          data={items}
          resizable
          columnWidths={columnWidths}
          onColumnResize={handleColumnResize}
        />
      </div>
    )
  },
}

/** 컬럼 순서 변경 (드래그 앤 드롭) */
export const ColumnReorderable: Story = {
  render: () => {
    interface FeatureItem {
      id: number
      code: string
      name: string
      category: string
      price: number
      stock: number
    }

    const items: FeatureItem[] = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      code: `ITEM-${i + 1}`,
      name: `상품 ${i + 1}`,
      category: ["전자기기", "의류", "식품", "가구"][i % 4],
      price: (i + 1) * 10000,
      stock: (i + 1) * 5,
    }))

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [columnOrder, setColumnOrder] = useState<(keyof FeatureItem)[]>([
      "code", "name", "category", "price", "stock"
    ])
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
      code: 100,
      category: 120,
      price: 100,
      stock: 100,
    })

    const featureColumns: DataTableColumn<FeatureItem>[] = [
      { accessorKey: "code", header: "코드", width: 100 },
      { accessorKey: "name", header: "상품명", minWidth: 150 },
      { accessorKey: "category", header: "카테고리", width: 120 },
      { accessorKey: "price", header: "가격", width: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}원` },
      { accessorKey: "stock", header: "재고", width: 100, align: "center" },
    ]

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          컬럼 순서 변경 + 컬럼 리사이징 + 행 선택이 모두 동작합니다.
        </p>
        <div className="mb-4 text-xs">
          <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded mb-2">
            순서: {JSON.stringify(columnOrder)}
          </div>
          <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
            너비: {JSON.stringify(columnWidths)}
          </div>
        </div>
        <DataTable
          columns={featureColumns}
          data={items}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
          columnReorderable
          columnOrder={columnOrder}
          onColumnReorder={setColumnOrder}
          resizable
          columnWidths={columnWidths}
          onColumnResize={(key, width) => setColumnWidths(prev => ({ ...prev, [String(key)]: width }))}
        />
      </div>
    )
  },
}

/** 로우 순서 변경 (드래그 앤 드롭) */
export const RowReorderable: Story = {
  render: () => {
    interface FeatureItem {
      id: number
      code: string
      name: string
      category: string
      price: number
      order: number
    }

    const [items, setItems] = useState<FeatureItem[]>(
      Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        code: `ITEM-${i + 1}`,
        name: `상품 ${i + 1}`,
        category: ["전자기기", "의류", "식품", "가구"][i % 4],
        price: (i + 1) * 10000,
        order: i + 1,
      }))
    )
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [columnOrder, setColumnOrder] = useState<(keyof FeatureItem)[]>([
      "order", "code", "name", "category", "price"
    ])
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
      order: 60,
      code: 100,
      category: 120,
      price: 100,
    })

    const featureColumns: DataTableColumn<FeatureItem>[] = [
      { accessorKey: "order", header: "순서", minWidth: 60 },
      { accessorKey: "code", header: "코드", minWidth: 100 },
      { accessorKey: "name", header: "상품명", minWidth: 150 },
      { accessorKey: "category", header: "카테고리", minWidth: 120 },
      { accessorKey: "price", header: "가격", minWidth: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}원` },
    ]

    const handleRowReorder = (newItems: FeatureItem[]) => {
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        order: index + 1,
      }))
      setItems(updatedItems)
    }

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          로우 순서 변경 + 컬럼 순서 변경 + 컬럼 리사이징 + 행 선택이 모두 동작합니다.
        </p>
        <div className="mb-4 text-xs">
          <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded mb-2">
            컬럼 순서: {JSON.stringify(columnOrder)}
          </div>
          <div className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
            선택됨: {selectedIds.length > 0 ? selectedIds.join(", ") : "없음"}
          </div>
        </div>
        <DataTable
          columns={featureColumns}
          data={items}
          rowReorderable
          onRowReorder={handleRowReorder}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
          columnReorderable
          columnOrder={columnOrder}
          onColumnReorder={setColumnOrder}
          resizable
          columnWidths={columnWidths}
          onColumnResize={(key, width) => setColumnWidths(prev => ({ ...prev, [String(key)]: width }))}
        />
      </div>
    )
  },
}

/** 행 추가/삭제 (외부 버튼) */
export const EditableWithAddDelete: Story = {
  render: () => {
    interface ProductItem {
      id: number
      sku: string
      name: string
      price: number
    }

    const [items, setItems] = useState<ProductItem[]>([
      { id: 1, sku: "SKU-001", name: "상품 A", price: 10000 },
      { id: 2, sku: "SKU-002", name: "상품 B", price: 20000 },
    ])

    const handleAddRow = () => {
      const newId = Math.max(0, ...items.map(item => item.id)) + 1
      const newItem: ProductItem = {
        id: newId,
        sku: `SKU-${String(newId).padStart(3, "0")}`,
        name: "",
        price: 0,
      }
      setItems([...items, newItem])
    }

    const handleDeleteRow = (id: number) => {
      setItems(items.filter(item => item.id !== id))
    }

    const handleCellChange = (
      rowId: string | number,
      columnKey: keyof ProductItem,
      value: ProductItem[keyof ProductItem]
    ) => {
      setItems((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, [columnKey]: value } : row
        )
      )
    }

    const productColumns: DataTableColumn<ProductItem>[] = [
      { accessorKey: "sku", header: "SKU", minWidth: 100 },
      { accessorKey: "name", header: "상품명", editable: true, minWidth: 150 },
      {
        accessorKey: "price",
        header: "가격",
        editable: true,
        align: "right",
        minWidth: 100,
        cell: (v) => `${(v as number).toLocaleString()}원`,
      },
      {
        accessorKey: "id",
        header: "액션",
        minWidth: 80,
        cell: (_, row) => (
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteRow(row.id)
            }}
          >
            삭제
          </Button>
        ),
      },
    ]

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          행 추가/삭제 버튼은 테이블 외부에 배치합니다. 데이터 배열을 직접 조작하여 행을 추가/삭제합니다.
        </p>
        <div className="flex gap-2 mb-2">
          <Button variant="primary" size="sm" onClick={handleAddRow}>
            + 상품 추가
          </Button>
        </div>
        <DataTable
          columns={productColumns}
          data={items}
          onCellChange={handleCellChange}
        />
      </div>
    )
  },
}

/** 헤더 그룹핑 (다중 레벨 헤더) */
export const HeaderGrouping: Story = {
  render: () => {
    interface AddressData {
      id: number
      name: string
      city: string
      district: string
      neighborhood: string
      phone: string
      mobile: string
    }

    const addressData: AddressData[] = [
      { id: 1, name: "홍길동", city: "서울", district: "강남구", neighborhood: "역삼동", phone: "02-1234-5678", mobile: "010-1111-2222" },
      { id: 2, name: "김철수", city: "서울", district: "서초구", neighborhood: "서초동", phone: "02-2345-6789", mobile: "010-3333-4444" },
      { id: 3, name: "이영희", city: "부산", district: "해운대구", neighborhood: "우동", phone: "051-1234-5678", mobile: "010-5555-6666" },
      { id: 4, name: "박민수", city: "대전", district: "유성구", neighborhood: "봉명동", phone: "042-1234-5678", mobile: "010-7777-8888" },
    ]

    const addressColumns: DataTableColumn<AddressData>[] = [
      { accessorKey: "name", header: "이름", width: 100 },
      { accessorKey: "city", header: "시", minWidth: 80 },
      { accessorKey: "district", header: "구", minWidth: 100 },
      { accessorKey: "neighborhood", header: "동", minWidth: 80 },
      { accessorKey: "phone", header: "전화", minWidth: 120 },
      { accessorKey: "mobile", header: "휴대폰", minWidth: 120 },
    ]

    const headerGroups: HeaderGroup<AddressData>[] = [
      { header: "주소", columns: ["city", "district", "neighborhood"] },
      { header: "연락처", columns: ["phone", "mobile"] },
    ]

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          "주소" 헤더가 시/구/동 컬럼을, "연락처" 헤더가 전화/휴대폰 컬럼을 그룹핑합니다.
          "이름" 컬럼은 그룹에 속하지 않아 두 행에 걸쳐 표시됩니다.
        </p>
        <DataTable
          columns={addressColumns}
          data={addressData}
          headerGroups={headerGroups}
        />
      </div>
    )
  },
}

/**
 * 로우 그룹핑 (셀 병합)
 *
 * - **rowGrouping**: 같은 값을 가진 행들의 셀 병합 (예: 같은 지역의 행들을 그룹핑)
 *
 * ## 호환 가능한 기능 (✅)
 * - selectable, headerGroups, resizable, columnReorderable, sticky, sortable, editable
 *
 * ## 사용 불가 (❌)
 * - **rowReorderable**: rowSpan 셀 드래그 시 레이아웃 깨짐 (자동 비활성화됨)
 *
 * ## 주의 (⚠️)
 * - **expandable**: 그룹 중간 행 확장 시 레이아웃 이슈 가능
 */
export const RowGrouping: Story = {
  render: () => {
    interface SalesData {
      id: number
      region: string
      salesPerson: string
      q1Sales: number
      q2Sales: number
      q3Sales: number
      q4Sales: number
    }

    const salesData: SalesData[] = [
      { id: 1, region: "서울", salesPerson: "홍길동", q1Sales: 1000, q2Sales: 1200, q3Sales: 1100, q4Sales: 1300 },
      { id: 2, region: "서울", salesPerson: "김철수", q1Sales: 900, q2Sales: 1100, q3Sales: 1000, q4Sales: 1200 },
      { id: 3, region: "서울", salesPerson: "이영희", q1Sales: 850, q2Sales: 950, q3Sales: 900, q4Sales: 1100 },
      { id: 4, region: "부산", salesPerson: "박민수", q1Sales: 800, q2Sales: 900, q3Sales: 850, q4Sales: 950 },
      { id: 5, region: "부산", salesPerson: "정수진", q1Sales: 700, q2Sales: 800, q3Sales: 750, q4Sales: 900 },
      { id: 6, region: "대전", salesPerson: "최지훈", q1Sales: 600, q2Sales: 700, q3Sales: 650, q4Sales: 750 },
    ]

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [sortState, setSortState] = useState<SortState<SalesData>>({ column: null, direction: null })
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})

    // 정렬 시 그룹 순서 유지: 1차 region, 2차 선택한 컬럼
    const sortedData = useMemo(() => {
      if (!sortState.column || !sortState.direction) return salesData

      return [...salesData].sort((a, b) => {
        // 1차: region으로 정렬 (그룹 유지)
        if (a.region !== b.region) {
          return a.region.localeCompare(b.region)
        }
        // 2차: 선택한 컬럼으로 정렬
        const aVal = a[sortState.column!]
        const bVal = b[sortState.column!]
        const cmp = typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal))
        return sortState.direction === "asc" ? cmp : -cmp
      })
    }, [sortState])

    const salesColumns: DataTableColumn<SalesData>[] = [
      { accessorKey: "region", header: "지역", width: 100, sticky: "left" },
      { accessorKey: "salesPerson", header: "담당자", minWidth: 100, sortable: true },
      { accessorKey: "q1Sales", header: "1분기", minWidth: 100, align: "right", sortable: true, cell: (v) => `${(v as number).toLocaleString()}만` },
      { accessorKey: "q2Sales", header: "2분기", minWidth: 100, align: "right", sortable: true, cell: (v) => `${(v as number).toLocaleString()}만` },
      { accessorKey: "q3Sales", header: "3분기", minWidth: 100, align: "right", sortable: true, cell: (v) => `${(v as number).toLocaleString()}만` },
      { accessorKey: "q4Sales", header: "4분기", minWidth: 100, align: "right", sortable: true, cell: (v) => `${(v as number).toLocaleString()}만` },
    ]

    // 헤더 그룹: "분기별 매출"이 4개 분기 컬럼을 포함
    const headerGroups: HeaderGroup<SalesData>[] = [
      { header: "분기별 매출", columns: ["q1Sales", "q2Sales", "q3Sales", "q4Sales"] },
    ]

    // 로우 그룹: region 기준으로 셀 병합
    const rowGrouping: RowGroupConfig<SalesData> = {
      groupBy: "region",
      mergeColumns: ["region"],
    }

    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md text-sm">
          <h3 className="font-bold mb-2">그룹핑 호환성</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600 dark:text-slate-300">
            <p>✅ selectable (행 선택)</p>
            <p>✅ sortable (정렬 - 그룹 유지)</p>
            <p>✅ resizable (컬럼 리사이징)</p>
            <p>✅ sticky (고정 컬럼)</p>
            <p>❌ rowReorderable (자동 비활성화)</p>
            <p>⚠️ expandable (레이아웃 주의)</p>
          </div>
        </div>
        <p className="text-sm text-slate-500">
          선택됨: {selectedIds.length > 0 ? selectedIds.join(", ") : "없음"}
        </p>
        <DataTable
          columns={salesColumns}
          data={sortedData}
          headerGroups={headerGroups}
          rowGrouping={rowGrouping}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
          sortState={sortState}
          onSortChange={setSortState}
          resizable
          columnWidths={columnWidths}
          onColumnResize={(key, width) => setColumnWidths((prev) => ({ ...prev, [String(key)]: width }))}
        />
        <p className="text-xs text-slate-400">
          * 헤더 그룹핑: "분기별 매출"이 1~4분기 컬럼을 그룹핑 / 로우 그룹핑: 같은 지역의 셀이 병합됨
          <br />
          * 정렬 시 지역(그룹) 순서를 유지하면서 그룹 내에서만 정렬됩니다.
        </p>
      </div>
    )
  },
}

/** 로우 그룹핑 (스티키 없음) - 비교용 */
export const RowGroupingNoSticky: Story = {
  render: () => {
    interface SalesData {
      id: number
      region: string
      salesPerson: string
      q1Sales: number
      q2Sales: number
      q3Sales: number
      q4Sales: number
    }

    const salesData: SalesData[] = [
      { id: 1, region: "서울", salesPerson: "홍길동", q1Sales: 1000, q2Sales: 1200, q3Sales: 1100, q4Sales: 1300 },
      { id: 2, region: "서울", salesPerson: "김철수", q1Sales: 900, q2Sales: 1100, q3Sales: 1000, q4Sales: 1200 },
      { id: 3, region: "서울", salesPerson: "이영희", q1Sales: 850, q2Sales: 950, q3Sales: 900, q4Sales: 1100 },
      { id: 4, region: "부산", salesPerson: "박민수", q1Sales: 800, q2Sales: 900, q3Sales: 850, q4Sales: 950 },
      { id: 5, region: "부산", salesPerson: "정수진", q1Sales: 700, q2Sales: 800, q3Sales: 750, q4Sales: 900 },
      { id: 6, region: "대전", salesPerson: "최지훈", q1Sales: 600, q2Sales: 700, q3Sales: 650, q4Sales: 750 },
    ]

    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const salesColumns: DataTableColumn<SalesData>[] = [
      { accessorKey: "region", header: "지역", width: 100 },
      { accessorKey: "salesPerson", header: "담당자", minWidth: 100 },
      { accessorKey: "q1Sales", header: "1분기", minWidth: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}만` },
      { accessorKey: "q2Sales", header: "2분기", minWidth: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}만` },
      { accessorKey: "q3Sales", header: "3분기", minWidth: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}만` },
      { accessorKey: "q4Sales", header: "4분기", minWidth: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}만` },
    ]

    const rowGrouping: RowGroupConfig<SalesData> = {
      groupBy: "region",
      mergeColumns: ["region"],
    }

    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md text-sm">
          <h3 className="font-bold mb-2">스티키 컬럼 없는 로우 그룹핑</h3>
          <p className="text-slate-600 dark:text-slate-300">
            sticky 컬럼 없이 로우 그룹핑만 적용된 테이블입니다. 비교용.
          </p>
        </div>
        <p className="text-sm text-slate-500">
          선택됨: {selectedIds.length > 0 ? selectedIds.join(", ") : "없음"}
        </p>
        <DataTable
          columns={salesColumns}
          data={salesData}
          rowGrouping={rowGrouping}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
        />
      </div>
    )
  },
}
