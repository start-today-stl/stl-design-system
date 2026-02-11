import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { PaginationFooter } from "../src/components/table"

const meta = {
  title: "Table/PaginationFooter",
  component: PaginationFooter,
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
    },
    totalPages: {
      control: "number",
    },
    totalItems: {
      control: "number",
    },
    pageSize: {
      control: "number",
    },
  },
} satisfies Meta<typeof PaginationFooter>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 PaginationFooter */
export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const totalItems = 1234
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
      />
    )
  },
}

/** 영문 라벨 */
export const EnglishLabels: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const totalItems = 1234
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
        previousLabel="Previous"
        nextLabel="Next"
        pageSizeLabel="Items per page"
        formatItemRange={(start, end, total) =>
          `Showing ${start.toLocaleString()}-${end.toLocaleString()} of ${total.toLocaleString()}`
        }
      />
    )
  },
}

/** 페이지 사이즈 선택자 없이 */
export const WithoutPageSizeSelector: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 124

    return (
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={1234}
        hidePageSizeSelector
      />
    )
  },
}

/** 아이템 범위 숨기기 */
export const WithoutItemRange: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const totalItems = 1234
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
        hideItemRange
      />
    )
  },
}

/** 커스텀 페이지 사이즈 옵션 */
export const CustomPageSizeOptions: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(25)
    const totalItems = 500
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        pageSizeOptions={[25, 50, 100, 200]}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
      />
    )
  },
}
