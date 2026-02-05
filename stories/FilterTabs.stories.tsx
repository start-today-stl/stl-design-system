import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { FilterTabs } from '../src/dashboard/filter-tabs'

const meta = {
  title: 'Dashboard/FilterTabs',
  component: FilterTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: '탭 옵션 목록',
    },
    value: {
      control: 'text',
      description: '선택된 값 (제어 컴포넌트)',
    },
    defaultValue: {
      control: 'text',
      description: '기본 선택 값 (비제어 컴포넌트)',
    },
  },
} satisfies Meta<typeof FilterTabs>

export default meta
type Story = StoryObj<typeof meta>

// 기본
export const Default: Story = {
  args: {
    options: ['최근 7일', '최근 15일', '최근 30일'],
    defaultValue: '최근 7일',
  },
}

// 제어 컴포넌트
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('최근 7일')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <FilterTabs
          options={['최근 7일', '최근 15일', '최근 30일']}
          value={value}
          onValueChange={setValue}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>선택됨: {value}</span>
      </div>
    )
  },
}

// 다양한 옵션
export const VariousOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>기간 필터</span>
        <FilterTabs options={['최근 7일', '최근 15일', '최근 30일']} defaultValue="최근 7일" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>상태 필터</span>
        <FilterTabs options={['전체', '진행중', '완료']} defaultValue="전체" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>정렬</span>
        <FilterTabs options={['최신순', '오래된순', '이름순']} defaultValue="최신순" />
      </div>
    </div>
  ),
}
