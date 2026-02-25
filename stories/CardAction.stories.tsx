import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { CardAction, CardActionGroup } from '../src/components/dashboard'

const meta = {
  title: 'Dashboard/CardAction',
  component: CardActionGroup,
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
} satisfies Meta<typeof CardActionGroup>

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
        <CardActionGroup
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
        <CardActionGroup options={['최근 7일', '최근 15일', '최근 30일']} defaultValue="최근 7일" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>상태 필터</span>
        <CardActionGroup options={['전체', '진행중', '완료']} defaultValue="전체" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>정렬</span>
        <CardActionGroup options={['최신순', '오래된순', '이름순']} defaultValue="최신순" />
      </div>
    </div>
  ),
}

// 단일 CardAction 버튼
export const SingleAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>기본 버튼</span>
        <CardAction>새로고침</CardAction>
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>선택된 상태</span>
        <CardAction selected>선택됨</CardAction>
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>여러 액션</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <CardAction>바로가기</CardAction>
          <CardAction>더보기</CardAction>
          <CardAction>새로고침</CardAction>
        </div>
      </div>
    </div>
  ),
}
