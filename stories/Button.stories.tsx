import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button } from '../src/components/ui/button'
import { UploadIcon, SearchIcon, DeleteIcon } from '../src/icons'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'basic-filled', 'negative', 'negative-filled', 'action', 'action-filled', 'default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'icon', 'icon-sm'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
  args: {
    onClick: fn(),
    children: 'Buttons',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic (Gray) - 기본 버튼
export const Basic: Story = {
  args: {
    variant: 'basic',
    children: 'Buttons',
  },
}

// Negative (Red) - 삭제/경고 버튼
export const Negative: Story = {
  args: {
    variant: 'negative',
    children: 'Buttons',
  },
}

// Action (Blue) - 주요 액션 버튼
export const Action: Story = {
  args: {
    variant: 'action',
    children: 'Buttons',
  },
}

// Disabled 상태
export const Disabled: Story = {
  args: {
    variant: 'basic',
    children: 'Buttons',
    disabled: true,
  },
}

// 크기 변형
export const Small: Story = {
  args: {
    variant: 'basic',
    size: 'sm',
    children: 'Buttons',
  },
}

// 모든 Variant 한번에 보기
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Outline</span>
        <Button variant="basic">Buttons</Button>
        <Button variant="negative">Buttons</Button>
        <Button variant="action">Buttons</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Filled</span>
        <Button variant="basic-filled">Buttons</Button>
        <Button variant="negative-filled">Buttons</Button>
        <Button variant="action-filled">Buttons</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Disabled</span>
        <Button variant="basic" disabled>Buttons</Button>
        <Button variant="basic-filled" disabled>Buttons</Button>
      </div>
    </div>
  ),
}

// 아이콘 + 텍스트 버튼
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>default</span>
        <Button variant="basic"><UploadIcon size={24} /> Buttons</Button>
        <Button variant="negative"><DeleteIcon size={24} /> Buttons</Button>
        <Button variant="action"><SearchIcon size={24} /> Buttons</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>sm</span>
        <Button variant="basic" size="sm"><UploadIcon size={16} /> Buttons</Button>
        <Button variant="negative" size="sm"><DeleteIcon size={16} /> Buttons</Button>
        <Button variant="action" size="sm"><SearchIcon size={16} /> Buttons</Button>
      </div>
    </div>
  ),
}

// 아이콘만 있는 버튼
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>icon</span>
        <Button variant="basic" size="icon" aria-label="업로드"><UploadIcon size={24} /></Button>
        <Button variant="negative" size="icon" aria-label="삭제"><DeleteIcon size={24} /></Button>
        <Button variant="action" size="icon" aria-label="검색"><SearchIcon size={24} /></Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>icon-sm</span>
        <Button variant="basic" size="icon-sm" aria-label="업로드"><UploadIcon size={24} /></Button>
        <Button variant="negative" size="icon-sm" aria-label="삭제"><DeleteIcon size={24} /></Button>
        <Button variant="action" size="icon-sm" aria-label="검색"><SearchIcon size={24} /></Button>
      </div>
    </div>
  ),
}
