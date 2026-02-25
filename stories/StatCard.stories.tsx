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

// Main Variant - 그라데이션 (기본)
export const Main: Story = {
  render: (args) => (
    <div style={{ width: '236px' }}>
      <StatCard {...args} />
    </div>
  ),
  args: {
    variant: 'main',
    icon: <InformationIcon size={24} />,
    count: '00',
    label: '전체',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText('전체')).toBeInTheDocument()
    expect(canvas.getByText('00')).toBeInTheDocument()

    const card = canvasElement.querySelector('[class*="cursor-pointer"]')
    if (card) {
      await userEvent.click(card)
      expect(args.onClick).toHaveBeenCalled()
    }
  },
}

// Main Variant - 테두리 스타일
export const MainBordered: Story = {
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
    bordered: true,
  },
}

// Sub Variant - 그라데이션
export const Sub: Story = {
  render: (args) => (
    <div style={{ width: '236px' }}>
      <StatCard {...args} />
    </div>
  ),
  args: {
    variant: 'sub',
    icon: <InformationIcon size={24} />,
    count: '00',
    label: '전체',
    badge: <Badge variant="success-outline">양호</Badge>,
  },
}

// Sub Variant - 테두리 스타일
export const SubBordered: Story = {
  render: (args) => (
    <div style={{ width: '236px' }}>
      <StatCard {...args} />
    </div>
  ),
  args: {
    variant: 'sub',
    icon: <InformationIcon size={24} />,
    count: '01',
    label: '미입고',
    badge: <Badge variant="success-outline">양호</Badge>,
    bordered: true,
  },
}

// Small Variant - 그라데이션
export const Small: Story = {
  render: (args) => (
    <div style={{ width: '208px' }}>
      <StatCard {...args} />
    </div>
  ),
  args: {
    variant: 'small',
    icon: <InformationIcon size={24} />,
    count: '00',
    label: '전체',
  },
}

// Small Variant - 테두리 스타일
export const SmallBordered: Story = {
  render: (args) => (
    <div style={{ width: '208px' }}>
      <StatCard {...args} />
    </div>
  ),
  args: {
    variant: 'small',
    icon: <InformationIcon size={24} />,
    count: '0건',
    label: '주소지 오류',
    bordered: true,
  },
}

// 스타일 비교: 그라데이션 vs 테두리
export const StyleComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '500px' }}>
      {/* 그라데이션 스타일 */}
      <div>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '12px', display: 'block' }}>그라데이션 (기본)</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ width: '236px' }}>
            <StatCard variant="main" icon={<InformationIcon size={24} />} count="125" label="전체" />
          </div>
          <div style={{ width: '236px' }}>
            <StatCard variant="sub" icon={<InformationIcon size={24} />} count="42" label="입고" badge={<Badge variant="success-outline">양호</Badge>} />
          </div>
        </div>
      </div>
      {/* 테두리 스타일 */}
      <div>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '12px', display: 'block' }}>테두리 (bordered)</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ width: '236px' }}>
            <StatCard variant="main" icon={<InformationIcon size={24} />} count="125" label="전체" bordered />
          </div>
          <div style={{ width: '236px' }}>
            <StatCard variant="sub" icon={<InformationIcon size={24} />} count="01" label="미입고" badge={<Badge variant="success-outline">양호</Badge>} bordered />
          </div>
        </div>
      </div>
    </div>
  ),
}

// 모든 Variant 비교
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>Main - STL Gothic R 폰트 (너비 유연)</span>
        <StatCard
          variant="main"
          icon={<InformationIcon size={24} />}
          count="125"
          label="전체"
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>Sub + Badge (너비 유연)</span>
        <StatCard
          variant="sub"
          icon={<InformationIcon size={24} />}
          count="42"
          label="입고"
          badge={<Badge variant="success-outline">양호</Badge>}
        />
      </div>
      <div>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>Small 가로형 (너비 유연)</span>
        <StatCard
          variant="small"
          icon={<InformationIcon size={24} />}
          count="00"
          label="전체"
        />
      </div>
    </div>
  ),
}

// 대시보드 레이아웃 예시 (테두리 스타일)
export const DashboardExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', padding: '20px', background: '#fff', width: '700px' }}>
      {/* 메인 카드 - 넓은 너비 */}
      <div style={{ flex: 1 }}>
        <StatCard
          variant="main"
          icon={<InformationIcon size={24} />}
          count="123,201"
          label="전체"
          bordered
        />
      </div>
      {/* 우측 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '220px' }}>
        {/* Sub 카드들 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <StatCard
              variant="sub"
              icon={<InformationIcon size={24} />}
              count="15"
              label="입고"
              badge={<Badge variant="success-outline">양호</Badge>}
              bordered
            />
          </div>
        </div>
        {/* Small 카드들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" bordered />
          <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="배송번호 변경" bordered />
        </div>
      </div>
    </div>
  ),
}
