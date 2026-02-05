import type { Meta, StoryObj } from "@storybook/react"
import { Notice } from "@/layout/notice"
import { NoticeIcon } from "@/icons"

const meta: Meta<typeof Notice> = {
  title: "Layout/Notice",
  component: Notice,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "공지 제목",
    },
    description: {
      control: "text",
      description: "공지 내용",
    },
  },
}

export default meta
type Story = StoryObj<typeof Notice>

/** 기본 Notice */
export const Default: Story = {
  args: {
    icon: <NoticeIcon size={20} />,
    title: "CBT 시스템 정기 점검 안내 (12/15 02:00–05:00)",
    description: "안녕하세요. 더 안정적인 서비스 제공을 위해 CBT 시스템의 정기 점검이 진행될 예정입니다.",
  },
}

/** 제목만 있는 Notice */
export const TitleOnly: Story = {
  args: {
    icon: <NoticeIcon size={20} />,
    title: "시스템 점검 안내",
  },
}

/** 긴 내용의 Notice */
export const LongContent: Story = {
  args: {
    icon: <NoticeIcon size={20} />,
    title: "서비스 업데이트 안내",
    description: "안녕하세요. 더 나은 서비스 제공을 위해 시스템 업데이트가 진행될 예정입니다. 업데이트 중에는 일부 기능이 제한될 수 있으며, 완료 후 새로운 기능들을 만나보실 수 있습니다. 불편을 드려 죄송합니다.",
  },
}
