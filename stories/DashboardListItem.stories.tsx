import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { DashboardListItem } from '../src/dashboard/dashboard-list-item'
import { DashboardCard } from '../src/dashboard/dashboard-card'
import { InformationIcon } from '../src/icons'

const meta = {
  title: 'Dashboard/DashboardListItem',
  component: DashboardListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'text',
      description: '날짜 (좌측)',
    },
    title: {
      control: 'text',
      description: '제목 (중앙, 말줄임 처리)',
    },
    extra: {
      control: 'text',
      description: '추가 정보 (우측, 조회수 등)',
    },
  },
} satisfies Meta<typeof DashboardListItem>

export default meta
type Story = StoryObj<typeof meta>

// 기본
export const Default: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DashboardListItem {...args} />
    </div>
  ),
  args: {
    date: '2025.12.15',
    title: '판매 관리 시스템 점검 안내',
    extra: '000',
  },
}

// 긴 제목 (말줄임)
export const LongTitle: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DashboardListItem {...args} />
    </div>
  ),
  args: {
    date: '2025.12.15',
    title: '2025년 상반기 시스템 정기 점검 및 업데이트 안내 - 서비스 이용에 참고 부탁드립니다',
    extra: '1,234',
  },
}

// 추가 정보 없음
export const WithoutExtra: Story = {
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DashboardListItem {...args} />
    </div>
  ),
  args: {
    date: '2025.12.15',
    title: '판매 관리 시스템 점검 안내',
  },
}

// 리스트 형태
export const List: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <DashboardListItem date="2025.12.15" title="판매 관리 시스템 점검 안내" extra="000" />
      <DashboardListItem date="2025.12.14" title="배송 정책 변경 안내" extra="123" />
      <DashboardListItem date="2025.12.13" title="2025년 연말 휴무 안내" extra="456" />
      <DashboardListItem date="2025.12.12" title="새로운 기능 업데이트 안내" extra="789" />
    </div>
  ),
}

// 공지사항 대시보드 카드 예시
export const InDashboardCard: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <DashboardCard
        icon={<InformationIcon size={24} />}
        title="공지사항"
        headerAction={
          <button className="h-[18px] px-[5px] rounded-[2px] border border-gray-200 text-[10px] tracking-[-0.1px] text-gray-700 transition-colors cursor-pointer hover:bg-gray-50 dark:border-dark-300 dark:text-gray-100 dark:hover:bg-dark-400">
            더보기
          </button>
        }
      >
        <div>
          <DashboardListItem date="2025.12.15" title="판매 관리 시스템 점검 안내" extra="000" />
          <DashboardListItem date="2025.12.14" title="배송 정책 변경 안내" extra="123" />
          <DashboardListItem date="2025.12.13" title="2025년 연말 휴무 안내" extra="456" />
          <DashboardListItem date="2025.12.12" title="새로운 기능 업데이트 안내" extra="789" />
        </div>
      </DashboardCard>
    </div>
  ),
}
