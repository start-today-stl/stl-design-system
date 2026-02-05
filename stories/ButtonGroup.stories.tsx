import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../src/components/ui/button'
import { ButtonGroup } from '../src/components/ui/button-group'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'select',
      options: [2, 3],
      description: '버튼 개수',
    },
    variant: {
      control: 'select',
      options: ['basic', 'action', 'negative'],
      description: '버튼 스타일',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: '버튼 크기',
    },
  },
  args: {
    count: 3,
    variant: 'basic',
    size: 'default',
  },
} satisfies Meta<typeof ButtonGroup & { count: number; variant: string; size: string }>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (컨트롤로 개수/스타일/크기 선택 가능)
export const Default: Story = {
  render: (args) => {
    const { count = 3, variant = 'basic', size = 'default' } = args as {
      count?: number
      variant?: 'basic' | 'action' | 'negative'
      size?: 'default' | 'sm'
    }

    return (
      <ButtonGroup>
        {Array.from({ length: count }, (_, i) => (
          <Button key={i} variant={variant} size={size}>Buttons</Button>
        ))}
      </ButtonGroup>
    )
  },
}

// Basic (Gray) 버튼 그룹
export const Basic: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="basic" size="sm">Buttons</Button>
      <Button variant="basic" size="sm">Buttons</Button>
      <Button variant="basic" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}

// Action (Blue) 버튼 그룹
export const Action: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="action" size="sm">Buttons</Button>
      <Button variant="action" size="sm">Buttons</Button>
      <Button variant="action" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}

// Negative (Red) 버튼 그룹
export const Negative: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="negative" size="sm">Buttons</Button>
      <Button variant="negative" size="sm">Buttons</Button>
      <Button variant="negative" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}

// 모든 Variant
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Basic</span>
        <ButtonGroup>
          <Button variant="basic" size="sm">Buttons</Button>
          <Button variant="basic" size="sm">Buttons</Button>
          <Button variant="basic" size="sm">Buttons</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Action</span>
        <ButtonGroup>
          <Button variant="action" size="sm">Buttons</Button>
          <Button variant="action" size="sm">Buttons</Button>
          <Button variant="action" size="sm">Buttons</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Negative</span>
        <ButtonGroup>
          <Button variant="negative" size="sm">Buttons</Button>
          <Button variant="negative" size="sm">Buttons</Button>
          <Button variant="negative" size="sm">Buttons</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Disabled</span>
        <ButtonGroup>
          <Button variant="basic" size="sm" disabled>Buttons</Button>
          <Button variant="basic" size="sm" disabled>Buttons</Button>
          <Button variant="basic" size="sm" disabled>Buttons</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

// 두 개 버튼 그룹
export const TwoButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="action" size="sm">Buttons</Button>
      <Button variant="action" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}
