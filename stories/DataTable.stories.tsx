import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState, useMemo, useCallback } from "react"
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
import { SplashScreen } from "../src/components/ui/splash-screen"
import { Input } from "../src/components/ui/input"

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
  parameters: {
    // 스토리북 사이드바 정렬 (export 순서가 아닌 의도된 그룹 순서로 노출)
    options: {
      storySort: {
        order: [
          "Docs",
          // Basic
          "Default",
          "Selectable",
          "Sortable",
          "MultiSortable",
          "CustomCell",
          "RowClick",
          "Empty",
          // Loading
          "Loading",
          "LoadingCustom",
          "LoadingWithSkeleton",
          // Editing
          "Editable",
          "EditableWithCustomEditor",
          "EditableWithValidation",
          "EditableWithAddDelete",
          "EditingPatterns",
          // Layout / Columns
          "StickyColumn",
          "HeaderGrouping",
          "Resizable",
          "ColumnReorderable",
          // Rows
          "RowReorderable",
          "RowGrouping",
          "RowGroupingNoSticky",
          "Expandable",
          // Row Actions
          "RowActionsEditable",
          "RowActionsEditableExternal",
          // Composition
          "ListPageBasic",
          "AllFeatures",
          // Virtualization
          "VirtualizationBasic",
          "VirtualizationCustomOptions",
          "VirtualizationWithSelectAndSort",
          "VirtualizationWithExpandable",
          "VirtualizationStress10k",
          "VirtualizationIncompatibility",
        ],
      },
    },
  },
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
    const [sortState, setSortState] = useState<SortState<User>[]>([])
    const current = sortState[0]

    // 정렬된 데이터
    const sortedData = [...sampleData].sort((a, b) => {
      if (!current?.column || !current.direction) return 0
      const aValue = a[current.column]
      const bValue = b[current.column]
      const comparison = String(aValue).localeCompare(String(bValue))
      return current.direction === "asc" ? comparison : -comparison
    })

    return (
      <div>
        <p className="mb-4 text-sm text-slate-500">
          정렬: {current?.column ? `${String(current.column)} (${current.direction})` : "없음"}
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

/** 다중 정렬 (Shift+클릭으로 정렬 추가) */
export const MultiSortable: Story = {
  render: () => {
    const [sortState, setSortState] = useState<SortState<User>[]>([])

    // 다중 정렬된 데이터
    const sortedData = [...sampleData].sort((a, b) => {
      for (const sort of sortState) {
        if (!sort.column || !sort.direction) continue
        const aValue = a[sort.column]
        const bValue = b[sort.column]
        const comparison = String(aValue).localeCompare(String(bValue))
        if (comparison !== 0) {
          return sort.direction === "asc" ? comparison : -comparison
        }
      }
      return 0
    })

    return (
      <div>
        <p className="mb-2 text-sm text-slate-500">
          컬럼 헤더 클릭으로 정렬 추가 / 정렬된 컬럼은 asc → desc → 해제 순환
        </p>
        <p className="mb-4 text-xs text-slate-500">
          정렬 상태: {sortState.length === 0
            ? "없음"
            : sortState.map((s, i) => `${i + 1}. ${String(s.column)} (${s.direction})`).join(", ")}
        </p>
        <DataTable
          columns={columns}
          data={sortedData}
          multiSort
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
  render: () => {
    // 가로 스크롤 유도용 wide 컬럼 (minWidth 합계 > 컨테이너 너비)
    const wideColumns: DataTableColumn<User>[] = [
      { accessorKey: "id", header: "ID", minWidth: 300 },
      { accessorKey: "name", header: "이름", minWidth: 400 },
      { accessorKey: "email", header: "이메일", minWidth: 500 },
      { accessorKey: "role", header: "역할", minWidth: 400 },
      { accessorKey: "status", header: "상태", minWidth: 400 },
    ]
    return (
      <DataTable
        columns={wideColumns}
        data={[]}
        emptyMessage="검색 결과가 없습니다."
      />
    )
  },
}

/** 로딩 상태 (기본: SplashScreen) */
export const Loading: Story = {
  render: () => {
    // 가로 스크롤 유도용 wide 컬럼 (minWidth 합계 > 컨테이너 너비)
    const wideColumns: DataTableColumn<User>[] = [
      { accessorKey: "id", header: "ID", minWidth: 300 },
      { accessorKey: "name", header: "이름", minWidth: 400 },
      { accessorKey: "email", header: "이메일", minWidth: 500 },
      { accessorKey: "role", header: "역할", minWidth: 400 },
      { accessorKey: "status", header: "상태", minWidth: 400 },
    ]
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        {/* 툴바 */}
        <TableToolbar totalCount={0} selectedCount={0}>
          <Button variant="danger" disabled>삭제</Button>
          <Button variant="ghost">다운로드</Button>
        </TableToolbar>

        {/* 데이터 테이블 - 로딩 상태 */}
        <DataTable
          columns={wideColumns}
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
    )
  },
}

/** 로딩 상태 - 커스텀 (텍스트 포함) */
export const LoadingCustom: Story = {
  render: () => (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <TableToolbar totalCount={0} selectedCount={0}>
        <Button variant="danger" disabled>삭제</Button>
        <Button variant="ghost">다운로드</Button>
      </TableToolbar>

      <DataTable
        columns={columns}
        data={[]}
        loading
        selectable
        loadingContent={
          <div className="flex flex-col items-center gap-4">
            <SplashScreen size="default" />
            <p className="text-sm text-slate-500">데이터를 불러오는 중...</p>
          </div>
        }
      />

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

/** 로딩 상태 - Skeleton 사용 (loadingMode="skeleton") */
export const LoadingWithSkeleton: Story = {
  render: () => (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <TableToolbar totalCount={0} selectedCount={0}>
        <Button variant="danger" disabled>삭제</Button>
        <Button variant="ghost">다운로드</Button>
      </TableToolbar>

      <DataTable
        columns={columns}
        data={[]}
        loading
        loadingMode="skeleton"
        selectable
      />

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
          셀을 클릭하여 편집하세요. Enter 또는 다른 곳 클릭으로 저장, Escape로 취소.
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
    const [sortState, setSortState] = useState<SortState<User>[]>([])
    const current = sortState[0]
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
      if (!current?.column || !current.direction) return 0
      const aValue = a[current.column]
      const bValue = b[current.column]
      const comparison = String(aValue).localeCompare(String(bValue))
      return current.direction === "asc" ? comparison : -comparison
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
    const [sortState, setSortState] = useState<SortState<Product>[]>([])
    const current = sortState[0]
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const totalPages = Math.ceil(products.length / pageSize)

    // 정렬
    const sortedData = [...products].sort((a, b) => {
      if (!current?.column || !current.direction) return 0
      const aValue = a[current.column]
      const bValue = b[current.column]
      if (typeof aValue === "number" && typeof bValue === "number") {
        return current.direction === "asc" ? aValue - bValue : bValue - aValue
      }
      const comparison = String(aValue).localeCompare(String(bValue))
      return current.direction === "asc" ? comparison : -comparison
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
                  : "primary-light"
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
          <br />
          * headerGroups + sticky 사용 시, 같은 그룹 내부 컬럼의 sticky 방향(left/right/none)을 통일해야
          1행 그룹 헤더도 sticky가 정상 동작합니다.
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
    const [sortState, setSortState] = useState<SortState<SalesData>[]>([])
    const current = sortState[0]
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})

    // 정렬 시 그룹 순서 유지: 1차 region, 2차 선택한 컬럼
    const sortedData = useMemo(() => {
      if (!current?.column || !current?.direction) return salesData

      return [...salesData].sort((a, b) => {
        // 1차: region으로 정렬 (그룹 유지)
        if (a.region !== b.region) {
          return a.region.localeCompare(b.region)
        }
        // 2차: 선택한 컬럼으로 정렬
        const aVal = a[current.column!]
        const bVal = b[current.column!]
        const cmp = typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal))
        return current.direction === "asc" ? cmp : -cmp
      })
    }, [current, salesData])

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

/** 편집 가능 테이블 + 행 추가/삭제 (테이블 내부 추가 버튼) */
export const RowActionsEditable: Story = {
  render: () => {
    // 상품 데이터 타입
    interface Product {
      id: number
      name: string
      price: number
      quantity: number
    }

    // 초기 데이터
    const [data, setData] = useState<Product[]>([
      { id: 1, name: "상품 A", price: 10000, quantity: 5 },
      { id: 2, name: "상품 B", price: 20000, quantity: 3 },
      { id: 3, name: "상품 C", price: 15000, quantity: 8 },
    ])

    // 다음 ID
    const [nextId, setNextId] = useState(4)

    // 컬럼 정의 (편집 가능)
    const productColumns: DataTableColumn<Product>[] = [
      {
        accessorKey: "name",
        header: "상품명",
        width: 150,
        editable: true,
        validate: (value) => {
          if (!value || String(value).trim() === "") {
            return "상품명을 입력하세요"
          }
          return true
        },
      },
      {
        accessorKey: "price",
        header: "가격",
        width: 120,
        align: "right",
        editable: true,
        cell: (value) => `${(value as number).toLocaleString()}원`,
        validate: (value) => {
          const num = Number(value)
          if (isNaN(num) || num < 0) {
            return "올바른 가격을 입력하세요"
          }
          return true
        },
      },
      {
        accessorKey: "quantity",
        header: "수량",
        width: 80,
        align: "center",
        editable: true,
        validate: (value) => {
          const num = Number(value)
          if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
            return "올바른 수량을 입력하세요"
          }
          return true
        },
      },
    ]

    // 행 추가 핸들러
    const handleRowAdd = () => {
      const newProduct: Product = {
        id: nextId,
        name: `새 상품`,
        price: 0,
        quantity: 0,
      }
      setData([...data, newProduct])
      setNextId(nextId + 1)
    }

    // 행 삭제 핸들러
    const handleRowDelete = (row: Product) => {
      setData(data.filter((item) => item.id !== row.id))
    }

    // 셀 변경 핸들러
    const handleCellChange = (
      rowId: string | number,
      columnKey: keyof Product,
      value: Product[keyof Product]
    ) => {
      setData(
        data.map((item) => {
          if (item.id === rowId) {
            return { ...item, [columnKey]: value }
          }
          return item
        })
      )
    }

    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md text-sm">
          <h3 className="font-bold mb-2">행 추가/삭제 + 셀 편집</h3>
          <p className="text-slate-600 dark:text-slate-300">
            rowActions와 editable 컬럼을 함께 사용합니다.
            셀을 클릭하면 편집 모드로 전환되며, Enter 또는 다른 곳 클릭으로 저장, Escape로 취소합니다.
          </p>
        </div>
        <p className="text-sm text-slate-500">
          총 {data.length}개의 상품
        </p>
        <DataTable
          columns={productColumns}
          data={data}
          onCellChange={handleCellChange}
          rowActions={{
            onRowAdd: handleRowAdd,
            onRowDelete: handleRowDelete,
          }}
        />
      </div>
    )
  },
}

/** 편집 가능 테이블 + 행 추가/삭제 (외부 추가 버튼) */
export const RowActionsEditableExternal: Story = {
  render: () => {
    // 상품 데이터 타입
    interface Product {
      id: number
      name: string
      price: number
      quantity: number
    }

    // 초기 데이터
    const [data, setData] = useState<Product[]>([
      { id: 1, name: "상품 A", price: 10000, quantity: 5 },
      { id: 2, name: "상품 B", price: 20000, quantity: 3 },
      { id: 3, name: "상품 C", price: 15000, quantity: 8 },
    ])

    // 다음 ID
    const [nextId, setNextId] = useState(4)

    // 컬럼 정의 (편집 가능)
    const productColumns: DataTableColumn<Product>[] = [
      {
        accessorKey: "name",
        header: "상품명",
        width: 150,
        editable: true,
        validate: (value) => {
          if (!value || String(value).trim() === "") {
            return "상품명을 입력하세요"
          }
          return true
        },
      },
      {
        accessorKey: "price",
        header: "가격",
        width: 120,
        align: "right",
        editable: true,
        cell: (value) => `${(value as number).toLocaleString()}원`,
        validate: (value) => {
          const num = Number(value)
          if (isNaN(num) || num < 0) {
            return "올바른 가격을 입력하세요"
          }
          return true
        },
      },
      {
        accessorKey: "quantity",
        header: "수량",
        width: 80,
        align: "center",
        editable: true,
        validate: (value) => {
          const num = Number(value)
          if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
            return "올바른 수량을 입력하세요"
          }
          return true
        },
      },
    ]

    // 행 추가 핸들러
    const handleRowAdd = () => {
      const newProduct: Product = {
        id: nextId,
        name: `새 상품`,
        price: 0,
        quantity: 0,
      }
      setData([...data, newProduct])
      setNextId(nextId + 1)
    }

    // 행 삭제 핸들러
    const handleRowDelete = (row: Product) => {
      setData(data.filter((item) => item.id !== row.id))
    }

    // 셀 변경 핸들러
    const handleCellChange = (
      rowId: string | number,
      columnKey: keyof Product,
      value: Product[keyof Product]
    ) => {
      setData(
        data.map((item) => {
          if (item.id === rowId) {
            return { ...item, [columnKey]: value }
          }
          return item
        })
      )
    }

    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md text-sm">
          <h3 className="font-bold mb-2">행 추가/삭제 + 셀 편집 (외부 추가 버튼)</h3>
          <p className="text-slate-600 dark:text-slate-300">
            테이블 내부에는 삭제 아이콘만 표시하고, 행 추가는 테이블 위의 별도 버튼으로 처리합니다.
            셀을 클릭하면 편집 모드로 전환되며, Enter 또는 다른 곳 클릭으로 저장, Escape로 취소합니다.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            총 {data.length}개의 상품
          </p>
          <Button onClick={handleRowAdd}>행 추가</Button>
        </div>
        <DataTable
          columns={productColumns}
          data={data}
          onCellChange={handleCellChange}
          rowActions={{
            onRowDelete: handleRowDelete,
          }}
        />
      </div>
    )
  },
}

/**
 * 편집 패턴 비교: editable vs 커스텀 렌더러
 *
 * ## 언제 어떤 방식을 사용해야 할까?
 *
 * ### 1. `editable` prop (기존 데이터 수정)
 * - 이미 저장된 데이터의 **셀 값을 수정**하는 경우
 * - 예: 재고 수량 수정, 메모 수정, 가격 조정
 * - 호버 시 편집 아이콘 표시로 편집 가능 여부를 나타냄
 *
 * ### 2. 커스텀 렌더러 (새 행에 값 입력)
 * - **새로 추가된 행**에 처음부터 값을 입력해야 하는 경우
 * - 예: 상품 목록에 새 상품 추가, 주문 항목 추가
 * - cell 렌더러로 Input, Select 등을 직접 렌더링
 */
export const EditingPatterns: Story = {
  render: () => {
    // 1. editable prop 사용 예시 (기존 데이터 수정)
    interface InventoryItem {
      id: number
      sku: string
      name: string
      stock: number
      memo: string
    }

    const [inventoryData, setInventoryData] = useState<InventoryItem[]>([
      { id: 1, sku: "SKU-001", name: "상품 A", stock: 50, memo: "인기 상품" },
      { id: 2, sku: "SKU-002", name: "상품 B", stock: 30, memo: "" },
      { id: 3, sku: "SKU-003", name: "상품 C", stock: 0, memo: "품절 예정" },
    ])

    const inventoryColumns = useMemo<DataTableColumn<InventoryItem>[]>(
      () => [
        { accessorKey: "sku", header: "SKU", width: 100 },
        { accessorKey: "name", header: "상품명", width: 120 },
        { accessorKey: "stock", header: "재고", width: 80, align: "center", editable: true },
        { accessorKey: "memo", header: "메모", minWidth: 150, editable: true },
      ],
      [],
    )

    const handleInventoryCellChange = useCallback(
      (
        rowId: string | number,
        columnKey: keyof InventoryItem,
        value: InventoryItem[keyof InventoryItem],
      ) => {
        setInventoryData((prev) =>
          prev.map((row) =>
            row.id === rowId ? { ...row, [columnKey]: value } : row,
          ),
        )
      },
      [],
    )

    // 2. 커스텀 렌더러 사용 예시 (새 데이터 입력)
    interface OrderItem {
      id: number
      productName: string
      quantity: number
      unitPrice: number
    }

    const [orderItems, setOrderItems] = useState<OrderItem[]>([
      { id: 1, productName: "", quantity: 0, unitPrice: 0 },
      { id: 2, productName: "", quantity: 0, unitPrice: 0 },
    ])

    const handleOrderChange = useCallback(
      (id: number, field: keyof OrderItem, value: string | number) => {
        setOrderItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, [field]: value } : item,
          ),
        )
      },
      [],
    )

    const addOrderRow = useCallback(() => {
      setOrderItems((prev) => {
        const newId = Math.max(0, ...prev.map((i) => i.id)) + 1
        return [...prev, { id: newId, productName: "", quantity: 0, unitPrice: 0 }]
      })
    }, [])

    const orderColumns = useMemo<DataTableColumn<OrderItem>[]>(
      () => [
        {
          accessorKey: "productName",
          header: "상품명",
          minWidth: 150,
          cell: (_, row) => (
            <Input
              value={row.productName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOrderChange(row.id, "productName", e.target.value)
              }
              placeholder="상품명 입력"
              className="h-7 text-xs"
            />
          ),
        },
        {
          accessorKey: "quantity",
          header: "수량",
          width: 100,
          cell: (_, row) => (
            <Input
              type="number"
              value={row.quantity || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOrderChange(row.id, "quantity", Number(e.target.value))
              }
              placeholder="0"
              className="h-7 text-xs text-right"
            />
          ),
        },
        {
          accessorKey: "unitPrice",
          header: "단가",
          width: 120,
          cell: (_, row) => (
            <Input
              type="number"
              value={row.unitPrice || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOrderChange(row.id, "unitPrice", Number(e.target.value))
              }
              placeholder="0"
              className="h-7 text-xs text-right"
            />
          ),
        },
        {
          accessorKey: "id",
          header: "합계",
          width: 100,
          align: "right",
          cell: (_, row) => {
            const total = row.quantity * row.unitPrice
            return <span className="text-slate-600 dark:text-slate-300">{total.toLocaleString()}원</span>
          },
        },
      ],
      [handleOrderChange],
    )

    return (
      <div className="space-y-8">
        {/* 패턴 1: editable prop */}
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
              패턴 1: editable prop (기존 데이터 수정)
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              이미 저장된 데이터의 <strong>셀 값을 수정</strong>할 때 사용합니다.
              <br />
              호버 시 편집 아이콘이 표시되어 편집 가능 여부를 나타냅니다.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            예시: 기존 상품의 재고 수량과 메모 수정 (SKU, 상품명은 읽기 전용)
          </p>
          <DataTable
            columns={inventoryColumns}
            data={inventoryData}
            onCellChange={handleInventoryCellChange}
          />
        </div>

        {/* 패턴 2: 커스텀 렌더러 */}
        <div className="space-y-3">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-md">
            <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">
              패턴 2: 커스텀 렌더러 (새 행에 값 입력)
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>새로 추가된 행</strong>에 처음부터 값을 입력해야 할 때 사용합니다.
              <br />
              cell 렌더러로 Input, Select 등 컴포넌트를 직접 렌더링합니다.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              예시: 주문 항목 추가 (새 행에 상품명, 수량, 단가 입력)
            </p>
            <Button variant="ghost" size="sm" onClick={addOrderRow}>
              + 행 추가
            </Button>
          </div>
          <DataTable columns={orderColumns} data={orderItems} />
        </div>
      </div>
    )
  },
}

// ============================================================
// 가상화 (Virtualization) 스토리
// 큰 데이터셋에서 화면에 보이는 행만 렌더링 — DOM 노드 수 큰 폭 감소
// ============================================================

interface VirtualRow {
  id: number
  no: string
  name: string
  email: string
  role: string
  status: "활성" | "비활성"
  amount: number
  balance: number
  cumulative: number
  monthlyAvg: number
  companyEmail: string
  manager: string
  department: string
  date: string
  joinedAt: string
  lastActive: string
}

const generateVirtualRows = (count: number): VirtualRow[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    no: `ORD-${String(i + 1).padStart(6, "0")}`,
    name: `사용자 ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "관리자" : i % 3 === 1 ? "편집자" : "사용자",
    status: i % 4 === 0 ? "비활성" : "활성",
    amount: Math.floor(Math.random() * 1000000),
    balance: Math.floor(Math.random() * 1000000),
    cumulative: Math.floor(Math.random() * 10000000),
    monthlyAvg: Math.floor(Math.random() * 500000),
    companyEmail: `company${i + 1}@corp.com`,
    manager: `담당자 ${i + 1}`,
    department: i % 4 === 0 ? "영업" : i % 4 === 1 ? "개발" : i % 4 === 2 ? "디자인" : "기획",
    date: `2026-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
    joinedAt: `2024-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
    lastActive: `2026-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
  }))

const virtualColumns: DataTableColumn<VirtualRow>[] = [
  { accessorKey: "no", header: "주문번호", width: 140 },
  { accessorKey: "name", header: "이름", width: 120 },
  { accessorKey: "email", header: "이메일", minWidth: 200 },
  { accessorKey: "role", header: "역할", width: 100 },
  {
    accessorKey: "status",
    header: "상태",
    width: 80,
    cell: (value) => (
      <Badge variant={value === "활성" ? "success-light" : "danger-light"}>
        {value as string}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "금액",
    width: 120,
    align: "right",
    cell: (value) => `${(value as number).toLocaleString()}원`,
  },
  { accessorKey: "date", header: "날짜", width: 120 },
]

/** 가상화 기본 — 1000행 */
export const VirtualizationBasic: Story = {
  render: () => {
    const data = useMemo(() => generateVirtualRows(1000), [])
    return (
      <div className="space-y-3">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
          <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
            가상화 (Virtualization) 기본
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            데이터 1,000행이지만 실제로 DOM 에 렌더링된 행은 화면에 보이는 ~30행 + overscan 만큼.
            <br />
            `virtual` prop 만 추가하면 활성화. `maxHeight` 필수 (스크롤 컨테이너 높이 제약).
          </p>
        </div>
        <p className="text-xs text-slate-500">
          1,000행 데이터, virtual prop 활성, maxHeight 400px
        </p>
        <DataTable columns={virtualColumns} data={data} virtual maxHeight={400} />
      </div>
    )
  },
}

/** 가상화 + selectable + sortable */
export const VirtualizationWithSelectAndSort: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [sortState, setSortState] = useState<SortState<VirtualRow>[]>([])
    const allData = useMemo(() => generateVirtualRows(1000), [])
    const current = sortState[0]
    const sortedData = useMemo(() => {
      if (!current?.column || !current?.direction) return allData
      return [...allData].sort((a, b) => {
        const aVal = a[current.column!]
        const bVal = b[current.column!]
        const cmp =
          typeof aVal === "number" && typeof bVal === "number"
            ? aVal - bVal
            : String(aVal).localeCompare(String(bVal))
        return current.direction === "asc" ? cmp : -cmp
      })
    }, [allData, current])
    const cols = useMemo<DataTableColumn<VirtualRow>[]>(
      () =>
        virtualColumns.map((c) => ({
          ...c,
          sortable:
            c.accessorKey === "name" ||
            c.accessorKey === "amount" ||
            c.accessorKey === "date",
        })),
      [],
    )
    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-500">
          1,000행 + 행 선택 + 정렬 (이름/금액/날짜) + 가상화. 선택과 정렬은 가상화와 직교 동작.
        </p>
        <p className="text-xs text-slate-500">
          선택됨: {selectedIds.length}건 / 정렬: {current?.column ? `${String(current.column)} (${current.direction})` : "없음"}
        </p>
        <DataTable
          columns={cols}
          data={sortedData}
          virtual
          maxHeight={400}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
          sortState={sortState}
          onSortChange={setSortState}
        />
      </div>
    )
  },
}

/** 가상화 + 확장행 */
export const VirtualizationWithExpandable: Story = {
  render: () => {
    const data = useMemo(() => generateVirtualRows(1000), [])
    return (
      <div className="space-y-3">
        <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md text-xs text-amber-800 dark:text-amber-200">
          <strong>알려진 한계:</strong> 확장행의 펼침 영역 자체는 virtualizer 가 측정하지 않습니다.
          한 번에 여러 행을 펼친 채 빠르게 스크롤하면 위치 계산이 약간 부정확할 수 있습니다.
          단일 펼침 / 일반 사용에선 체감 차이 없음.
        </div>
        <DataTable
          columns={virtualColumns}
          data={data}
          virtual
          maxHeight={400}
          expandable={{
            expandedRowRender: (row) => (
              <div className="p-2 text-sm text-slate-700 dark:text-slate-300">
                <strong>상세:</strong> {row.name} ({row.email}) — {row.no} / {row.date} / {row.amount.toLocaleString()}원
              </div>
            ),
          }}
        />
      </div>
    )
  },
}

/** 가상화 옵션 커스터마이징 */
export const VirtualizationCustomOptions: Story = {
  render: () => {
    const data = useMemo(() => generateVirtualRows(1000), [])
    return (
      <div className="space-y-3">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-xs text-slate-700 dark:text-slate-300">
          <code>virtual={`{{ overscan: 10, estimateSize: 50 }}`}</code>
          <br />
          overscan 늘리면 (화면 밖 추가 렌더 행) 스크롤 시 빈 공간이 덜 보이지만 메모리/렌더 부담 ↑.
          estimateSize 는 실제 평균 행 높이에 맞춰주면 초기 스크롤 위치 계산 더 정확.
        </div>
        <DataTable
          columns={virtualColumns}
          data={data}
          virtual={{ overscan: 10, estimateSize: 50 }}
          maxHeight={400}
        />
      </div>
    )
  },
}

/** 가상화 - 스트레스 테스트 (10,000행 + 체크박스: ctx 안정성 / Set 변환 효과 측정) */
export const VirtualizationStress10k: Story = {
  render: () => {
    const data = useMemo(() => generateVirtualRows(10000), [])
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    return (
      <div className="space-y-3">
        <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-md text-xs text-red-800 dark:text-red-200">
          <strong>10,000행 스트레스 테스트.</strong> 가상화 미적용 시 DOM 노드 70만+ 개 (브라우저 멈춤).
          가상화 ON 으로 화면에 보이는 ~30행만 렌더 → 부드러운 스크롤.
          <br />
          체크박스 클릭 시 선택한 행만 리렌더되는지 / 클릭 응답 시간을 React DevTools Profiler 로 확인.
        </div>
        <p className="text-xs text-slate-500">선택됨: {selectedIds.length}건</p>
        <DataTable
          columns={virtualColumns}
          data={data}
          virtual
          maxHeight={400}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids as number[])}
        />
      </div>
    )
  },
}


/**
 * 가상화 비호환 케이스 통합 — 한 페이지에서 3가지 비호환 시나리오를 모두 확인.
 *
 * 공통 동작: `virtual` 옵션이 활성화되어 있어도 아래 기능 중 하나라도 같이 켜져 있으면
 * 가상화가 자동 OFF 되고 모든 행이 DOM 에 렌더된다. (작은 데이터셋만 사용 권장)
 *
 * 1. sticky 컬럼: CSS sticky + 가상화 스크롤 시 sub-pixel border 깜빡임 (브라우저 한계)
 * 2. rowReorderable: 행 DnD 시 가상화로 인해 보이지 않는 행의 위치 계산 불가
 * 3. rowGrouping: rowSpan 셀 병합. 그룹 시작 행이 viewport 밖이면 렌더링 깨짐
 *
 * 모두 v2 div-based grid 재설계 시 호환 가능 (별도 epic 예정).
 */
export const VirtualizationIncompatibility: Story = {
  render: () => {
    // 1. sticky 컬럼 + virtual
    const stickyData = useMemo(() => generateVirtualRows(50), [])
    const stickyCols = useMemo<DataTableColumn<VirtualRow>[]>(
      () => [
        { accessorKey: "no", header: "주문번호", minWidth: 160, sticky: "left" },
        { accessorKey: "name", header: "이름", minWidth: 120, sticky: "left" },
        { accessorKey: "email", header: "이메일", minWidth: 240 },
        { accessorKey: "role", header: "역할", minWidth: 120 },
        { accessorKey: "department", header: "부서", minWidth: 140 },
        { accessorKey: "manager", header: "담당자", minWidth: 140 },
        {
          accessorKey: "amount",
          header: "금액",
          minWidth: 160,
          align: "right",
          cell: (v) => `${(v as number).toLocaleString()}원`,
        },
        { accessorKey: "date", header: "날짜", minWidth: 140, sticky: "right" },
      ],
      [],
    )

    // 2. rowReorderable + virtual
    const [reorderItems, setReorderItems] = useState(generateVirtualRows(20))
    const reorderCols = useMemo<DataTableColumn<VirtualRow>[]>(() => virtualColumns, [])

    // 3. rowGrouping + virtual
    interface GroupRow {
      id: number
      region: string
      name: string
      amount: number
    }
    const groupData = useMemo<GroupRow[]>(() => {
      const regions = ["서울", "경기", "부산", "대구", "광주"]
      return Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        region: regions[Math.floor(i / 6)],
        name: `담당자${i + 1}`,
        amount: Math.floor(Math.random() * 10000) * 100,
      }))
    }, [])
    const groupCols = useMemo<DataTableColumn<GroupRow>[]>(
      () => [
        { accessorKey: "region", header: "지역", minWidth: 100 },
        { accessorKey: "name", header: "담당자", minWidth: 120 },
        {
          accessorKey: "amount",
          header: "금액",
          minWidth: 120,
          align: "right",
          cell: (v) => `${(v as number).toLocaleString()}원`,
        },
      ],
      [],
    )
    const rowGrouping = useMemo<RowGroupConfig<GroupRow>>(
      () => ({ groupBy: "region", mergeColumns: ["region"] }),
      [],
    )

    return (
      <div className="space-y-8">
        <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md text-xs text-amber-800 dark:text-amber-200">
          <strong>가상화 비호환 케이스 모음.</strong>
          <br />
          아래 3가지 기능 중 하나라도 활성화되면 가상화가 자동 OFF 되고 모든 행이 DOM 에 렌더됩니다.
          작은 데이터셋에서만 사용하세요. v2 div-based grid 재설계 시 호환 예정.
        </div>

        {/* 1. sticky */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            1. sticky 컬럼 + virtual
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            CSS sticky + 가상화 스크롤 시 sub-pixel border 깜빡임 (브라우저 한계, Mozilla Bug
            #1585378 등). 좌/우 sticky 컬럼이 있는 50행 테이블. 가상화 자동 OFF.
          </p>
          <DataTable columns={stickyCols} data={stickyData} virtual maxHeight={300} />
        </section>

        {/* 2. rowReorderable */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            2. rowReorderable + virtual
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            행 DnD 가 가상화로 보이지 않는 행의 위치를 알 수 없음. 20행 테이블. 가상화 자동 OFF +
            드래그 핸들 정상 동작.
          </p>
          <DataTable
            columns={reorderCols}
            data={reorderItems}
            virtual
            maxHeight={300}
            rowReorderable
            onRowReorder={(newData) => setReorderItems(newData as VirtualRow[])}
          />
        </section>

        {/* 3. rowGrouping */}
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            3. rowGrouping + virtual
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            rowSpan 셀 병합. 그룹 시작 행이 viewport 밖이면 렌더링 깨짐. region 별 5행씩 그룹된 30행
            테이블. 가상화 자동 OFF + rowSpan 정상 동작.
          </p>
          <DataTable
            columns={groupCols}
            data={groupData}
            virtual
            maxHeight={300}
            rowGrouping={rowGrouping}
          />
        </section>
      </div>
    )
  },
}
