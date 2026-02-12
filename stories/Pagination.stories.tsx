import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Pagination, PageSizeSelector } from "@/components/table/pagination"

const meta: Meta<typeof Pagination> = {
  title: "Table/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Pagination>

/** 기본 페이지네이션 */
export const Default: Story = {
  render: function DefaultExample() {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    )
  },
}

/** 페이지 많을 때 (Ellipsis 표시) */
export const ManyPages: Story = {
  render: function ManyPagesExample() {
    const [currentPage, setCurrentPage] = useState(15)

    return (
      <div className="flex flex-col gap-4">
        <Pagination
          currentPage={currentPage}
          totalPages={50}
          onPageChange={setCurrentPage}
        />
        <p className="text-xs text-slate-500 text-center">
          현재 페이지: {currentPage} / 50
        </p>
      </div>
    )
  },
}

/** 첫 페이지 */
export const FirstPage: Story = {
  render: () => (
    <Pagination
      currentPage={1}
      totalPages={20}
    />
  ),
}

/** 마지막 페이지 */
export const LastPage: Story = {
  render: () => (
    <Pagination
      currentPage={20}
      totalPages={20}
    />
  ),
}

/** 페이지 적을 때 */
export const FewPages: Story = {
  render: function FewPagesExample() {
    const [currentPage, setCurrentPage] = useState(2)

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />
    )
  },
}

/** 커스텀 라벨 */
export const CustomLabels: Story = {
  render: function CustomLabelsExample() {
    const [currentPage, setCurrentPage] = useState(5)

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        previousLabel="이전"
        nextLabel="다음"
      />
    )
  },
}

/** 페이지 사이즈 셀렉터 */
export const WithPageSizeSelector: Story = {
  render: function PageSizeSelectorExample() {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    return (
      <div className="flex items-center gap-6">
        <PageSizeSelector
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(100 / pageSize)}
          onPageChange={setCurrentPage}
        />
      </div>
    )
  },
}

/** 페이지 사이즈 셀렉터 (라벨 없이) */
export const PageSizeSelectorNoLabel: Story = {
  render: function PageSizeSelectorNoLabelExample() {
    const [pageSize, setPageSize] = useState(20)

    return (
      <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        label=""
      />
    )
  },
}

/** 커스텀 페이지 사이즈 옵션 */
export const CustomPageSizeOptions: Story = {
  render: function CustomPageSizeOptionsExample() {
    const [pageSize, setPageSize] = useState(25)

    return (
      <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        options={[25, 50, 75, 100]}
        label="표시 개수"
      />
    )
  },
}
