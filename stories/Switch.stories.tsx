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
  args: {},
}

/** On 상태 */
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

/** Small 사이즈 */
export const Small: Story = {
  args: {
    size: "sm",
  },
}

/** Small On 상태 */
export const SmallChecked: Story = {
  args: {
    size: "sm",
    defaultChecked: true,
  },
}

/** 비활성화 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

/** 비활성화 + On */
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

/** 라벨 포함 */
export const WithLabel: Story = {
  args: {
    size: "sm",
    label: "Setting Off",
  },
}

/** 라벨 포함 + On */
export const WithLabelChecked: Story = {
  args: {
    size: "sm",
    defaultChecked: true,
    label: "Setting On",
  },
}

/** 모든 상태 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Large */}
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-500">Large</span>
        <Switch />
        <Switch defaultChecked />
        <Switch disabled />
        <Switch disabled defaultChecked />
      </div>

      {/* Small */}
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-500">Small</span>
        <Switch size="sm" />
        <Switch size="sm" defaultChecked />
        <Switch size="sm" disabled />
        <Switch size="sm" disabled defaultChecked />
      </div>

      {/* With Label */}
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-500">With Label</span>
        <Switch size="sm" label="Setting Off" />
        <Switch size="sm" defaultChecked label="Setting On" />
      </div>
    </div>
  ),
}
