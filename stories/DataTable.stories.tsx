import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  DataTable,
  TableToolbar,
  Pagination,
  PageSizeSelector,
  type DataTableColumn,
  type SortState,
  type EditComponentProps,
  type ExpandableConfig,
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

const meta = {
  title: "Table/DataTable",
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

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

// 주문 상세 아이템 타입 (확장 영역용)
interface OrderItem {
  id: number
  sku: string
  productName: string
  quantity: number
  price: number
}

// 주문 타입 (확장 가능한 행)
interface Order {
  id: number
  orderNo: string
  customerName: string
  orderDate: string
  totalAmount: number
  status: "대기" | "처리중" | "완료" | "취소"
  items: OrderItem[]
}

/** 확장 가능한 행 */
export const Expandable: Story = {
  render: () => {
    // 주문 데이터 (상세 아이템 포함)
    const orderData: Order[] = [
      {
        id: 1,
        orderNo: "ORD-2024-001",
        customerName: "홍길동",
        orderDate: "2024-01-15",
        totalAmount: 150000,
        status: "완료",
        items: [
          { id: 101, sku: "SKU001", productName: "상품 A", quantity: 2, price: 50000 },
          { id: 102, sku: "SKU002", productName: "상품 B", quantity: 1, price: 50000 },
        ],
      },
      {
        id: 2,
        orderNo: "ORD-2024-002",
        customerName: "김철수",
        orderDate: "2024-01-16",
        totalAmount: 80000,
        status: "처리중",
        items: [
          { id: 201, sku: "SKU003", productName: "상품 C", quantity: 1, price: 80000 },
        ],
      },
      {
        id: 3,
        orderNo: "ORD-2024-003",
        customerName: "이영희",
        orderDate: "2024-01-17",
        totalAmount: 0,
        status: "취소",
        items: [], // 빈 상세 - 확장 불가
      },
      {
        id: 4,
        orderNo: "ORD-2024-004",
        customerName: "박민수",
        orderDate: "2024-01-18",
        totalAmount: 220000,
        status: "대기",
        items: [
          { id: 401, sku: "SKU004", productName: "상품 D", quantity: 3, price: 40000 },
          { id: 402, sku: "SKU005", productName: "상품 E", quantity: 2, price: 50000 },
        ],
      },
    ]

    // 주문 목록 컬럼
    const orderColumns: DataTableColumn<Order>[] = [
      { accessorKey: "orderNo", header: "주문번호" },
      { accessorKey: "customerName", header: "고객명" },
      { accessorKey: "orderDate", header: "주문일" },
      {
        accessorKey: "totalAmount",
        header: "총액",
        align: "right",
        cell: (value) => `${(value as number).toLocaleString()}원`,
      },
      {
        accessorKey: "status",
        header: "상태",
        cell: (value) => {
          const statusColors: Record<string, "default" | "success-light" | "warning-light" | "danger-light"> = {
            대기: "default",
            처리중: "warning-light",
            완료: "success-light",
            취소: "danger-light",
          }
          return <Badge variant={statusColors[value as string] || "default"}>{value as string}</Badge>
        },
      },
    ]

    // 상세 아이템 컬럼
    const itemColumns: DataTableColumn<OrderItem>[] = [
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "productName", header: "상품명" },
      { accessorKey: "quantity", header: "수량", align: "center" },
      {
        accessorKey: "price",
        header: "가격",
        align: "right",
        cell: (value) => `${(value as number).toLocaleString()}원`,
      },
    ]

    // 확장 설정
    const expandableConfig: ExpandableConfig<Order> = {
      // 상세 아이템이 있는 행만 확장 가능
      rowExpandable: (row) => row.items.length > 0,
      // 확장 영역에 상세 테이블 렌더링
      expandedRowRender: (row) => (
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">주문 상세 ({row.items.length}개 상품)</p>
          <DataTable columns={itemColumns} data={row.items} />
        </div>
      ),
    }

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          화살표 아이콘을 클릭하여 행을 확장하세요. 상세 아이템이 없는 행(취소)은 확장 불가합니다.
        </p>
        <DataTable
          columns={orderColumns}
          data={orderData}
          expandable={expandableConfig}
        />
      </div>
    )
  },
}

/** 고정 컬럼 (Sticky Column) */
export const StickyColumn: Story = {
  render: () => {
    // 넓은 테이블 데이터
    interface Product {
      id: number
      sku: string
      name: string
      category: string
      brand: string
      price: number
      stock: number
      rating: number
      reviews: number
      description: string
      actions: string
    }

    const products: Product[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      sku: `SKU-${String(i + 1).padStart(4, "0")}`,
      name: `상품 ${i + 1}`,
      category: ["전자기기", "의류", "식품", "가구", "도서"][i % 5],
      brand: ["브랜드A", "브랜드B", "브랜드C"][i % 3],
      price: (i + 1) * 10000,
      stock: (i + 1) * 10,
      rating: 3 + (i % 3),
      reviews: (i + 1) * 5,
      description: `이것은 상품 ${i + 1}의 상세 설명입니다. 아주 긴 텍스트가 들어갈 수 있습니다.`,
      actions: "actions",
    }))

    const productColumns: DataTableColumn<Product>[] = [
      // sticky 컬럼은 width (고정 너비)
      { accessorKey: "sku", header: "SKU", width: 120, sticky: "left" },
      { accessorKey: "name", header: "상품명", width: 150, sticky: "left" },
      // non-sticky 컬럼은 minWidth (유동적 너비)
      { accessorKey: "category", header: "카테고리", minWidth: 120 },
      { accessorKey: "brand", header: "브랜드", minWidth: 120 },
      { accessorKey: "price", header: "가격", minWidth: 100, align: "right", cell: (v) => `${(v as number).toLocaleString()}원` },
      { accessorKey: "stock", header: "재고", minWidth: 80, align: "center" },
      { accessorKey: "rating", header: "평점", minWidth: 80, align: "center", cell: (v) => `${v}/5` },
      { accessorKey: "reviews", header: "리뷰수", minWidth: 80, align: "center" },
      { accessorKey: "description", header: "설명", minWidth: 200 },
      {
        accessorKey: "actions",
        header: "액션",
        width: 150,
        sticky: "right",
        cell: () => (
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">수정</Button>
            <Button variant="danger" size="sm">삭제</Button>
          </div>
        ),
      },
    ]

    return (
      <div>
        <p className="mb-4 text-xs text-slate-400">
          SKU, 상품명은 왼쪽 고정, 액션은 오른쪽 고정입니다. 가로 스크롤하여 확인하세요.
        </p>
        <div className="w-[600px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <DataTable columns={productColumns} data={products} />
        </div>
      </div>
    )
  },
}

/** 고정 컬럼 + 선택 가능 */
export const StickyColumnWithSelection: Story = {
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
      { accessorKey: "name", header: "이름", minWidth: 150 },
      { accessorKey: "col1", header: "컬럼1", minWidth: 150 },
      { accessorKey: "col2", header: "컬럼2", minWidth: 150 },
      { accessorKey: "col3", header: "컬럼3", minWidth: 150 },
      { accessorKey: "col4", header: "컬럼4", minWidth: 150 },
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
        <div className="w-[500px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
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

/** 확장 가능 + 선택 가능 */
export const ExpandableWithSelection: Story = {
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
      { accessorKey: "category", header: "카테고리", minWidth: 120, sortable: true },
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
        minWidth: 100,
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
                  : "default"
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
        <div className="w-[700px] border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
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
