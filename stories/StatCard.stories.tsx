import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn, expect, userEvent, within } from 'storybook/test'

import { StatCard } from '../src/components/dashboard/stat-card'
import { Badge } from '../src/components/ui/badge'
import { InformationIcon } from '../src/icons'

const meta = {
  title: 'Dashboard/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['main', 'sub', 'small'],
      description: '카드 타입',
    },
    bordered: {
      control: 'boolean',
      description: '테두리 스타일 (흰색 배경 + 테두리)',
    },
    stretch: {
      control: 'boolean',
      description: '컨테이너 높이에 맞춤 (h-full)',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 (스켈레톤 표시)',
    },
    count: {
      control: 'text',
      description: '숫자/카운트',
    },
    label: {
      control: 'text',
      description: '라벨',
    },
  },
  args: {
    onClick: fn(),
    count: '00',
    label: '전체',
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (Main Variant)
export const Default: Story = {
  render: (args) => (
    <div style={{ width: '236px' }}>
      <StatCard {...args} />
    </div>
  ),
  args: {
    variant: 'main',
    icon: <InformationIcon size={24} />,
    count: '125',
    label: '전체',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('전체')).toBeInTheDocument()
    expect(canvas.getByText('125')).toBeInTheDocument()

    const card = canvasElement.querySelector('[class*="cursor-pointer"]')
    if (card) {
      await userEvent.click(card)
      expect(args.onClick).toHaveBeenCalled()
    }
  },
}

// 모든 Variant 비교
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>Main (큰 숫자)</span>
        <StatCard variant="main" icon={<InformationIcon size={24} />} count="125" label="전체" />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>Sub (중간 숫자 + Badge)</span>
        <StatCard variant="sub" icon={<InformationIcon size={24} />} count="42" label="입고" badge={<Badge variant="success-outline">양호</Badge>} />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>Small (가로형)</span>
        <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" />
      </div>
    </div>
  ),
}

// 스타일 비교: 그라데이션 vs 테두리
export const StyleComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px' }}>
      {/* 그라데이션 스타일 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '236px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>그라데이션 (기본)</span>
        <StatCard variant="main" icon={<InformationIcon size={24} />} count="125" label="전체" />
        <StatCard variant="sub" icon={<InformationIcon size={24} />} count="42" label="입고" badge={<Badge variant="success-outline">양호</Badge>} />
        <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" />
      </div>
      {/* 테두리 스타일 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '236px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>테두리 (bordered)</span>
        <StatCard variant="main" icon={<InformationIcon size={24} />} count="125" label="전체" bordered />
        <StatCard variant="sub" icon={<InformationIcon size={24} />} count="01" label="미입고" badge={<Badge variant="danger-outline">주의</Badge>} bordered />
        <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="배송번호 변경" bordered />
      </div>
    </div>
  ),
}

// 로딩 상태
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '236px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>로딩 중</span>
        <StatCard variant="main" loading />
        <StatCard variant="sub" loading />
        <StatCard variant="small" loading />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '236px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>로드 완료</span>
        <StatCard variant="main" icon={<InformationIcon size={24} />} count="125" label="전체" />
        <StatCard variant="sub" icon={<InformationIcon size={24} />} count="42" label="입고" badge={<Badge variant="success-outline">양호</Badge>} />
        <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" />
      </div>
    </div>
  ),
}

// Stretch (컨테이너 높이 맞춤)
export const Stretch: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>stretch 미적용</span>
        <div style={{ height: '250px', width: '200px', border: '1px dashed #ccc', padding: '10px' }}>
          <StatCard variant="sub" icon={<InformationIcon size={24} />} count="42" label="입고" badge={<Badge variant="success-outline">양호</Badge>} />
        </div>
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>stretch 적용</span>
        <div style={{ height: '250px', width: '200px', border: '1px dashed #ccc', padding: '10px' }}>
          <StatCard variant="sub" icon={<InformationIcon size={24} />} count="42" label="입고" badge={<Badge variant="success-outline">양호</Badge>} stretch />
        </div>
      </div>
    </div>
  ),
}

// 대시보드 레이아웃 예시
export const DashboardLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', padding: '20px', background: '#f8f9fa', width: '700px' }}>
      {/* 메인 카드 */}
      <div style={{ flex: 1 }}>
        <StatCard variant="main" icon={<InformationIcon size={24} />} count="123,201" label="전체" bordered />
      </div>
      {/* 우측 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '220px' }}>
        <StatCard variant="sub" icon={<InformationIcon size={24} />} count="15" label="입고" badge={<Badge variant="success-outline">양호</Badge>} bordered />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" bordered />
          <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="배송번호 변경" bordered />
        </div>
      </div>
    </div>
  ),
}
