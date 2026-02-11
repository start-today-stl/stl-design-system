import type { Meta, StoryObj } from "@storybook/react-vite"
import { TableToolbar } from "../src/components/table"
import { Button } from "../src/components/ui/button"

const meta = {
  title: "Table/TableToolbar",
  component: TableToolbar,
  tags: ["autodocs"],
  argTypes: {
    totalCount: {
      control: "number",
    },
    selectedCount: {
      control: "number",
    },
  },
} satisfies Meta<typeof TableToolbar>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 툴바 (전체 건수만) */
export const Default: Story = {
  args: {
    totalCount: 1234,
  },
  render: (args) => (
    <TableToolbar {...args}>
      <Button variant="ghost">다운로드</Button>
      <Button variant="ghost">업로드</Button>
    </TableToolbar>
  ),
}

/** 선택된 항목 있음 */
export const WithSelection: Story = {
  args: {
    totalCount: 1234,
    selectedCount: 3,
  },
  render: (args) => (
    <TableToolbar {...args}>
      <Button variant="ghost" disabled={args.selectedCount === 0}>
        삭제
      </Button>
      <Button variant="ghost">다운로드</Button>
      <Button variant="ghost">업로드</Button>
    </TableToolbar>
  ),
}

/** 선택 기반 액션 비활성화 */
export const DisabledActions: Story = {
  args: {
    totalCount: 1234,
    selectedCount: 0,
  },
  render: (args) => (
    <TableToolbar {...args}>
      <Button variant="ghost" disabled>
        삭제
      </Button>
      <Button variant="ghost">다운로드</Button>
      <Button variant="ghost">업로드</Button>
    </TableToolbar>
  ),
}

/** 커스텀 포맷 */
export const CustomFormat: Story = {
  args: {
    totalCount: 5678,
    selectedCount: 12,
    formatTotal: (count) => `전체 ${count.toLocaleString()}개`,
    formatSelected: (count) => `${count}건 선택됨`,
  },
  render: (args) => (
    <TableToolbar {...args}>
      <Button variant="primary">처리하기</Button>
    </TableToolbar>
  ),
}
