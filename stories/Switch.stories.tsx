import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch } from "../src/components/ui/switch"

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 스위치 (Large) */
export const Default: Story = {
  args: {
    "aria-label": "스위치",
  },
}

/** On 상태 */
export const Checked: Story = {
  args: {
    "aria-label": "스위치",
    defaultChecked: true,
  },
}

/** Small 사이즈 */
export const Small: Story = {
  args: {
    "aria-label": "스위치",
    size: "sm",
  },
}

/** Small On 상태 */
export const SmallChecked: Story = {
  args: {
    "aria-label": "스위치",
    size: "sm",
    defaultChecked: true,
  },
}

/** 비활성화 */
export const Disabled: Story = {
  args: {
    "aria-label": "스위치",
    disabled: true,
  },
}

/** 비활성화 + On */
export const DisabledChecked: Story = {
  args: {
    "aria-label": "스위치",
    disabled: true,
    defaultChecked: true,
  },
}

/** 라벨 포함 */
export const WithLabel: Story = {
  args: {
    "aria-label": "Setting Off",
    size: "sm",
    label: "Setting Off",
  },
}

/** 라벨 포함 + On */
export const WithLabelChecked: Story = {
  args: {
    "aria-label": "Setting On",
    size: "sm",
    defaultChecked: true,
    label: "Setting On",
  },
}

/** 필수 입력 표시 */
export const Required: Story = {
  args: {
    "aria-label": "Setting",
    size: "sm",
    label: "해외 판매 상품",
    required: true,
  },
}

/** 모든 상태 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Large */}
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-slate-500">Large</span>
        <Switch aria-label="Large 스위치 Off" />
        <Switch aria-label="Large 스위치 On" defaultChecked />
        <Switch aria-label="Large 스위치 Disabled" disabled />
        <Switch aria-label="Large 스위치 Disabled On" disabled defaultChecked />
      </div>

      {/* Small */}
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-slate-500">Small</span>
        <Switch aria-label="Small 스위치 Off" size="sm" />
        <Switch aria-label="Small 스위치 On" size="sm" defaultChecked />
        <Switch aria-label="Small 스위치 Disabled" size="sm" disabled />
        <Switch aria-label="Small 스위치 Disabled On" size="sm" disabled defaultChecked />
      </div>

      {/* With Label */}
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-slate-500">With Label</span>
        <Switch aria-label="Setting Off" size="sm" label="Setting Off" />
        <Switch aria-label="Setting On" size="sm" defaultChecked label="Setting On" />
      </div>
    </div>
  ),
}
