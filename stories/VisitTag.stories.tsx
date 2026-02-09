import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { VisitTag } from "../src/layout/visit-tag"

const meta: Meta<typeof VisitTag> = {
  title: "Layout/VisitTag",
  component: VisitTag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "태그 라벨",
    },
    href: {
      control: "text",
      description: "클릭 시 이동할 URL",
    },
    onNavigate: {
      action: "navigate",
      description: "클릭 핸들러",
    },
    onRemove: {
      action: "remove",
      description: "삭제 핸들러",
    },
  },
}

export default meta
type Story = StoryObj<typeof VisitTag>

/** 기본 VisitTag */
export const Default: Story = {
  args: {
    label: "판매 관리",
    onNavigate: () => console.log("Navigate"),
    onRemove: () => console.log("Remove"),
  },
}

/** 삭제 버튼 없음 */
export const WithoutRemove: Story = {
  render: () => (
    <VisitTag
      label="STL"
      onNavigate={() => console.log("Navigate")}
    />
  ),
}

/** href 링크 사용 */
export const WithHref: Story = {
  args: {
    label: "대시보드",
    href: "#dashboard",
    onRemove: () => console.log("Remove"),
  },
}

/** 여러 태그 나열 */
export const Multiple: Story = {
  render: function Render() {
    const [tags, setTags] = useState([
      { id: "1", label: "판매 관리" },
      { id: "2", label: "STL" },
      { id: "3", label: "사은품 관리" },
      { id: "4", label: "주문 관리" },
    ])

    const handleRemove = (id: string) => {
      setTags(tags.filter((tag) => tag.id !== id))
    }

    return (
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <VisitTag
            key={tag.id}
            label={tag.label}
            onNavigate={() => console.log(`Navigate to ${tag.label}`)}
            onRemove={() => handleRemove(tag.id)}
          />
        ))}
      </div>
    )
  },
}

/** 긴 라벨 */
export const LongLabel: Story = {
  args: {
    label: "매우 긴 메뉴 이름입니다",
    onNavigate: () => console.log("Navigate"),
    onRemove: () => console.log("Remove"),
  },
}
