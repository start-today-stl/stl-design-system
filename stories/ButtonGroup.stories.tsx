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
      options: ['ghost-outline', 'primary-outline', 'danger-outline', 'success-outline'],
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
    variant: 'ghost-outline',
    size: 'default',
  },
} satisfies Meta<typeof ButtonGroup & { count: number; variant: string; size: string }>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (컨트롤로 개수/스타일/크기 선택 가능)
export const Default: Story = {
  render: (args) => {
    const { count = 3, variant = 'ghost-outline', size = 'default' } = args as {
      count?: number
      variant?: 'ghost-outline' | 'primary-outline' | 'danger-outline' | 'success-outline'
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

// Ghost (Slate) 버튼 그룹
export const GhostOutline: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="ghost-outline" size="sm">Buttons</Button>
      <Button variant="ghost-outline" size="sm">Buttons</Button>
      <Button variant="ghost-outline" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}

// Primary (Blue) 버튼 그룹
export const PrimaryOutline: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="primary-outline" size="sm">Buttons</Button>
      <Button variant="primary-outline" size="sm">Buttons</Button>
      <Button variant="primary-outline" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}

// Danger (Red) 버튼 그룹
export const DangerOutline: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="danger-outline" size="sm">Buttons</Button>
      <Button variant="danger-outline" size="sm">Buttons</Button>
      <Button variant="danger-outline" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}

// Success (Green) 버튼 그룹
export const SuccessOutline: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="success-outline" size="sm">Buttons</Button>
      <Button variant="success-outline" size="sm">Buttons</Button>
      <Button variant="success-outline" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}

// 모든 Variant
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Ghost</span>
        <ButtonGroup>
          <Button variant="ghost-outline" size="sm">Buttons</Button>
          <Button variant="ghost-outline" size="sm">Buttons</Button>
          <Button variant="ghost-outline" size="sm">Buttons</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Primary</span>
        <ButtonGroup>
          <Button variant="primary-outline" size="sm">Buttons</Button>
          <Button variant="primary-outline" size="sm">Buttons</Button>
          <Button variant="primary-outline" size="sm">Buttons</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Danger</span>
        <ButtonGroup>
          <Button variant="danger-outline" size="sm">Buttons</Button>
          <Button variant="danger-outline" size="sm">Buttons</Button>
          <Button variant="danger-outline" size="sm">Buttons</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Success</span>
        <ButtonGroup>
          <Button variant="success-outline" size="sm">Buttons</Button>
          <Button variant="success-outline" size="sm">Buttons</Button>
          <Button variant="success-outline" size="sm">Buttons</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Disabled</span>
        <ButtonGroup>
          <Button variant="ghost-outline" size="sm" disabled>Buttons</Button>
          <Button variant="ghost-outline" size="sm" disabled>Buttons</Button>
          <Button variant="ghost-outline" size="sm" disabled>Buttons</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

// 두 개 버튼 그룹
export const TwoButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="primary-outline" size="sm">Buttons</Button>
      <Button variant="primary-outline" size="sm">Buttons</Button>
    </ButtonGroup>
  ),
}
