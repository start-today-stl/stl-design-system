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
      options: ['ghost', 'ghost-outline', 'primary', 'primary-outline', 'danger', 'danger-outline', 'success', 'success-outline', 'text', 'default', 'destructive', 'outline', 'secondary', 'link'],
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
    loading: {
      control: 'boolean',
      description: '로딩 상태 (스피너 표시)',
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

// Ghost (Slate) - 중립 버튼
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Buttons',
  },
}

// Primary (Blue) - 주요 액션 버튼
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Buttons',
  },
}

// Danger (Red) - 삭제/경고 버튼
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Buttons',
  },
}

// Success (Green) - 완료/긍정 버튼
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Buttons',
  },
}

// Disabled 상태
export const Disabled: Story = {
  args: {
    variant: 'ghost',
    children: 'Buttons',
    disabled: true,
  },
}

// 크기 변형
export const Small: Story = {
  args: {
    variant: 'ghost',
    size: 'sm',
    children: 'Buttons',
  },
}

// 모든 Variant 한번에 보기
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Filled</span>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Outline</span>
        <Button variant="ghost-outline">Ghost</Button>
        <Button variant="primary-outline">Primary</Button>
        <Button variant="danger-outline">Danger</Button>
        <Button variant="success-outline">Success</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Text</span>
        <Button variant="text">Text</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '100px', fontSize: '12px', color: '#666' }}>Disabled</span>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="primary" disabled>Primary</Button>
      </div>
    </div>
  ),
}

// 아이콘 + 텍스트 버튼 (왼쪽 아이콘)
export const WithIconLeft: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>default</span>
        <Button variant="ghost"><UploadIcon size={24} /> Buttons</Button>
        <Button variant="danger"><DeleteIcon size={24} /> Buttons</Button>
        <Button variant="primary"><SearchIcon size={24} /> Buttons</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>sm</span>
        <Button variant="ghost" size="sm"><UploadIcon size={16} /> Buttons</Button>
        <Button variant="danger" size="sm"><DeleteIcon size={16} /> Buttons</Button>
        <Button variant="primary" size="sm"><SearchIcon size={16} /> Buttons</Button>
      </div>
    </div>
  ),
}

// 텍스트 + 아이콘 버튼 (오른쪽 아이콘)
export const WithIconRight: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>default</span>
        <Button variant="ghost">Buttons <UploadIcon size={24} /></Button>
        <Button variant="danger">Buttons <DeleteIcon size={24} /></Button>
        <Button variant="primary">Buttons <SearchIcon size={24} /></Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>sm</span>
        <Button variant="ghost" size="sm">Buttons <UploadIcon size={16} /></Button>
        <Button variant="danger" size="sm">Buttons <DeleteIcon size={16} /></Button>
        <Button variant="primary" size="sm">Buttons <SearchIcon size={16} /></Button>
      </div>
    </div>
  ),
}

// 아이콘 + 텍스트 + 아이콘 버튼 (양쪽 아이콘)
export const WithIconBoth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>default</span>
        <Button variant="ghost"><UploadIcon size={24} /> Buttons <SearchIcon size={24} /></Button>
        <Button variant="danger"><DeleteIcon size={24} /> Buttons <DeleteIcon size={24} /></Button>
        <Button variant="primary"><SearchIcon size={24} /> Buttons <UploadIcon size={24} /></Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>sm</span>
        <Button variant="ghost" size="sm"><UploadIcon size={16} /> Buttons <SearchIcon size={16} /></Button>
        <Button variant="danger" size="sm"><DeleteIcon size={16} /> Buttons <DeleteIcon size={16} /></Button>
        <Button variant="primary" size="sm"><SearchIcon size={16} /> Buttons <UploadIcon size={16} /></Button>
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
        <Button variant="ghost" size="icon" aria-label="업로드"><UploadIcon size={24} /></Button>
        <Button variant="danger" size="icon" aria-label="삭제"><DeleteIcon size={24} /></Button>
        <Button variant="primary" size="icon" aria-label="검색"><SearchIcon size={24} /></Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>icon-sm</span>
        <Button variant="ghost" size="icon-sm" aria-label="업로드"><UploadIcon size={24} /></Button>
        <Button variant="danger" size="icon-sm" aria-label="삭제"><DeleteIcon size={24} /></Button>
        <Button variant="primary" size="icon-sm" aria-label="검색"><SearchIcon size={24} /></Button>
      </div>
    </div>
  ),
}

// 로딩 상태 (정적)
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>default</span>
        <Button variant="primary" loading>Primary</Button>
        <Button variant="success" loading>Success</Button>
        <Button variant="danger" loading>Danger</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>sm</span>
        <Button variant="primary" size="sm" loading>Primary</Button>
        <Button variant="success" size="sm" loading>Success</Button>
        <Button variant="danger" size="sm" loading>Danger</Button>
      </div>
    </div>
  ),
}

// 로딩 상태 (인터랙티브)
export const LoadingInteractive: Story = {
  render: function Render() {
    const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({})

    const handleClick = (id: string) => {
      setLoadingStates(prev => ({ ...prev, [id]: true }))
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [id]: false }))
      }, 2000)
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          버튼을 클릭하면 2초간 로딩 상태가 됩니다.
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>default</span>
          <Button variant="primary" loading={loadingStates['primary']} onClick={() => handleClick('primary')}>
            저장하기
          </Button>
          <Button variant="success" loading={loadingStates['success']} onClick={() => handleClick('success')}>
            완료
          </Button>
          <Button variant="danger" loading={loadingStates['danger']} onClick={() => handleClick('danger')}>
            삭제
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>sm</span>
          <Button variant="primary" size="sm" loading={loadingStates['primary-sm']} onClick={() => handleClick('primary-sm')}>
            저장하기
          </Button>
          <Button variant="success" size="sm" loading={loadingStates['success-sm']} onClick={() => handleClick('success-sm')}>
            완료
          </Button>
          <Button variant="danger" size="sm" loading={loadingStates['danger-sm']} onClick={() => handleClick('danger-sm')}>
            삭제
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>with icon</span>
          <Button variant="primary" loading={loadingStates['icon']} onClick={() => handleClick('icon')}>
            <SearchIcon size={24} /> 검색
          </Button>
          <Button variant="ghost" loading={loadingStates['upload']} onClick={() => handleClick('upload')}>
            <UploadIcon size={24} /> 업로드
          </Button>
        </div>
      </div>
    )
  },
}
