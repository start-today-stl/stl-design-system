import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Pagination, PageSizeSelector } from "../src/components/table"

const meta = {
  title: "Table/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
    },
    totalPages: {
      control: "number",
    },
    siblingCount: {
      control: "number",
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 페이지네이션 */
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
}

/** 중간 페이지 */
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
}

/** 마지막 페이지 */
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
}

/** 많은 페이지 */
export const ManyPages: Story = {
  args: {
    currentPage: 34,
    totalPages: 68,
  },
}

/** 적은 페이지 */
export const FewPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
  },
}

/** 한글 라벨 */
export const KoreanLabels: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    previousLabel: "이전",
    nextLabel: "다음",
  },
}

/** 인터랙티브 */
export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 20

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-slate-500">
          현재 페이지: {currentPage} / {totalPages}
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    )
  },
}

/** Pagination + PageSizeSelector 조합 */
export const WithPageSizeSelector: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const totalItems = 234
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
      <div className="flex items-center justify-between w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
        />
      </div>
    )
  },
}

/** PageSizeSelector 단독 */
export const PageSizeSelectorOnly: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(10)

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-slate-500">
          현재 페이지 사이즈: {pageSize}
        </p>
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
      </div>
    )
  },
}

/** PageSizeSelector 커스텀 옵션 */
export const PageSizeSelectorCustomOptions: Story = {
  render: () => {
    const [pageSize, setPageSize] = useState(25)

    return (
      <PageSizeSelector
        pageSize={pageSize}
        options={[25, 50, 100, 200]}
        onPageSizeChange={setPageSize}
        label="표시 개수"
      />
    )
  },
}
