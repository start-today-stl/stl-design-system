import type { Meta, StoryObj } from "@storybook/react-vite"
import { Breadcrumb } from "../src/components/ui/breadcrumb"

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "Breadcrumb 아이템 목록",
    },
    separator: {
      description: "구분자 커스터마이징",
    },
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 Breadcrumb */
export const Default: Story = {
  args: {
    items: [
      { label: "홈", href: "/" },
      { label: "주문 관리", href: "/orders" },
      { label: "B2C 주문관리" },
    ],
  },
}

/** 2단계 뎁스 */
export const TwoLevels: Story = {
  args: {
    items: [
      { label: "대시보드", href: "/" },
      { label: "설정" },
    ],
  },
}

/** 4단계 뎁스 */
export const FourLevels: Story = {
  args: {
    items: [
      { label: "홈", href: "/" },
      { label: "판매 관리", href: "/sales" },
      { label: "주문", href: "/sales/orders" },
      { label: "주문 상세" },
    ],
  },
}

/** onClick 핸들러 사용 */
export const WithOnClick: Story = {
  args: {
    items: [
      { label: "홈", onClick: () => alert("홈 클릭!") },
      { label: "상품 관리", onClick: () => alert("상품 관리 클릭!") },
      { label: "상품 등록" },
    ],
  },
}

/** 커스텀 구분자 */
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "홈", href: "/" },
      { label: "설정", href: "/settings" },
      { label: "알림" },
    ],
    separator: "/",
  },
}

/** 단일 아이템 (현재 페이지만) */
export const SingleItem: Story = {
  args: {
    items: [{ label: "대시보드" }],
  },
}
