import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '../src/components/ui/checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (라벨 없음)
export const Default: Story = {
  args: {
    checked: false,
    'aria-label': '체크박스',
  },
}

// 체크됨 (라벨 없음)
export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': '체크박스',
  },
}

// 라벨 있음
export const WithLabel: Story = {
  args: {
    label: '목록 전체 선택',
  },
}

// 라벨 + 체크됨
export const WithLabelChecked: Story = {
  args: {
    label: '목록 전체 선택',
    checked: true,
  },
}

// 비활성화
export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': '체크박스',
  },
}

// 비활성화 + 체크됨
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    'aria-label': '체크박스',
  },
}

// 모든 상태 보기
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Default</span>
        <Checkbox aria-label="기본 체크박스" />
        <Checkbox aria-label="체크된 체크박스" checked />
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>With Label</span>
        <Checkbox label="목록 전체 선택" />
        <Checkbox label="목록 전체 선택" checked />
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Disabled</span>
        <Checkbox aria-label="비활성화 체크박스" disabled />
        <Checkbox aria-label="비활성화 체크된 체크박스" disabled checked />
      </div>
    </div>
  ),
}

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    return (
      <Checkbox
        label="동의합니다"
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
    )
  },
}
