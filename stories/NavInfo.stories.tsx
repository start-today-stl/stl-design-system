import type { Meta, StoryObj } from "@storybook/react"
import { NavInfo } from "@/layout/nav-info"
import { PhoneIcon, LocationIcon } from "@/icons"

const meta: Meta<typeof NavInfo> = {
  title: "Layout/NavInfo",
  component: NavInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof NavInfo>

/** 기본 NavInfo */
export const Default: Story = {
  args: {
    items: [
      { icon: <PhoneIcon size={20} />, text: "1800-4636", href: "tel:1800-4636" },
      { icon: <LocationIcon size={20} />, text: "경기도 파주시 조리읍 대원로 95-5 스타트투데이 2센터" },
    ],
  },
}

/** 전화번호만 */
export const PhoneOnly: Story = {
  args: {
    items: [
      { icon: <PhoneIcon size={20} />, text: "1800-4636", href: "tel:1800-4636" },
    ],
  },
}

/** 주소만 */
export const AddressOnly: Story = {
  args: {
    items: [
      { icon: <LocationIcon size={20} />, text: "경기도 파주시 조리읍 대원로 95-5 스타트투데이 2센터" },
    ],
  },
}
