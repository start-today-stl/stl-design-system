import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "../src/components/ui/badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "info-light",
        "info-solid",
        "info-outline",
        "success-light",
        "success-solid",
        "success-outline",
        "danger-light",
        "danger-solid",
        "danger-outline",
      ],
      description: "뱃지 스타일 변형",
    },
    children: {
      control: "text",
      description: "뱃지 텍스트",
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (Info Light)
export const Default: Story = {
  args: {
    children: "배송전",
    variant: "info-light",
  },
}

// Info Solid
export const InfoSolid: Story = {
  args: {
    children: "배송중",
    variant: "info-solid",
  },
}

// Info Outline
export const InfoOutline: Story = {
  args: {
    children: "일반",
    variant: "info-outline",
  },
}

// Success Light
export const SuccessLight: Story = {
  args: {
    children: "양호",
    variant: "success-light",
  },
}

// Success Solid
export const SuccessSolid: Story = {
  args: {
    children: "완료",
    variant: "success-solid",
  },
}

// Success Outline
export const SuccessOutline: Story = {
  args: {
    children: "양호",
    variant: "success-outline",
  },
}

// Danger Light
export const DangerLight: Story = {
  args: {
    children: "주의",
    variant: "danger-light",
  },
}

// Danger Solid
export const DangerSolid: Story = {
  args: {
    children: "긴급",
    variant: "danger-solid",
  },
}

// Danger Outline
export const DangerOutline: Story = {
  args: {
    children: "긴급",
    variant: "danger-outline",
  },
}

// 모든 상태 뱃지
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px", fontSize: "12px", color: "#666" }}>Info</span>
        <Badge variant="info-light">배송전</Badge>
        <Badge variant="info-solid">배송중</Badge>
        <Badge variant="info-outline">일반</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px", fontSize: "12px", color: "#666" }}>Success</span>
        <Badge variant="success-light">양호</Badge>
        <Badge variant="success-solid">완료</Badge>
        <Badge variant="success-outline">양호</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px", fontSize: "12px", color: "#666" }}>Danger</span>
        <Badge variant="danger-light">주의</Badge>
        <Badge variant="danger-solid">긴급</Badge>
        <Badge variant="danger-outline">긴급</Badge>
      </div>
    </div>
  ),
}
