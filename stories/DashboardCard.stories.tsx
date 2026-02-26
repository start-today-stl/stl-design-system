import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { DashboardCard } from '../src/components/dashboard/dashboard-card'
import { CardAction, CardActionGroup } from '../src/components/dashboard'
import { StatCard } from '../src/components/dashboard/stat-card'
import { Badge } from '../src/components/ui/badge'
import { InformationIcon } from '../src/icons'

const meta = {
  title: 'Dashboard/DashboardCard',
  component: DashboardCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '헤더 타이틀',
    },
    stretch: {
      control: 'boolean',
      description: '컨테이너 높이에 맞춤 (h-full)',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 (스켈레톤 표시)',
    },
  },
} satisfies Meta<typeof DashboardCard>

export default meta
type Story = StoryObj<typeof meta>

// 기본
export const Default: Story = {
  render: (args) => (
    <div style={{ width: '400px' }}>
      <DashboardCard {...args}>
        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          컨텐츠 영역
        </div>
      </DashboardCard>
    </div>
  ),
  args: {
    icon: <InformationIcon size={24} />,
    title: '전체',
  },
}

// 헤더 액션 (필터 탭, 버튼)
export const WithHeaderAction: Story = {
  render: () => {
    const [filter, setFilter] = React.useState('최근 7일')
    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* CardActionGroup */}
        <div style={{ width: '400px' }}>
          <DashboardCard
            icon={<InformationIcon size={24} />}
            title="필터 탭"
            headerAction={
              <CardActionGroup
                options={['최근 7일', '최근 15일', '최근 30일']}
                value={filter}
                onValueChange={setFilter}
              />
            }
          >
            <div style={{ fontSize: '14px', color: '#666' }}>선택된 필터: {filter}</div>
          </DashboardCard>
        </div>
        {/* CardAction */}
        <div style={{ width: '300px' }}>
          <DashboardCard
            icon={<InformationIcon size={24} />}
            title="버튼"
            headerAction={<CardAction>새로고침</CardAction>}
          >
            <div style={{ fontSize: '14px', color: '#666' }}>버튼 클릭 가능</div>
          </DashboardCard>
        </div>
      </div>
    )
  },
}

// 로딩 상태
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '300px' }}>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>로딩 중</span>
        <DashboardCard loading />
      </div>
      <div style={{ width: '300px' }}>
        <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>로드 완료</span>
        <DashboardCard
          icon={<InformationIcon size={24} />}
          title="필수 확인사항"
          headerAction={<CardAction>새로고침</CardAction>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <StatCard variant="small" count="0건" label="주소지 오류" />
            <StatCard variant="small" count="0건" label="배송번호 변경" />
            <StatCard variant="small" count="0건" label="국내 반송 대기" />
          </div>
        </DashboardCard>
      </div>
    </div>
  ),
}

// StatCard 조합 예시
export const WithStatCards: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Main StatCard */}
      <div style={{ width: '400px' }}>
        <DashboardCard icon={<InformationIcon size={24} />} title="전체">
          <StatCard variant="main" count="123,201" label="" />
        </DashboardCard>
      </div>
      {/* Sub StatCards */}
      <div style={{ width: '500px' }}>
        <DashboardCard icon={<InformationIcon size={24} />} title="입고 현황">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <StatCard variant="sub" icon={<InformationIcon size={24} />} count="15" label="입고" badge={<Badge variant="success-outline">양호</Badge>} />
            </div>
            <div style={{ flex: 1 }}>
              <StatCard variant="sub" icon={<InformationIcon size={24} />} count="01" label="미입고" badge={<Badge variant="danger-outline">주의</Badge>} />
            </div>
          </div>
        </DashboardCard>
      </div>
      {/* Small StatCards */}
      <div style={{ width: '300px' }}>
        <DashboardCard icon={<InformationIcon size={24} />} title="필수 확인사항" headerAction={<CardAction>새로고침</CardAction>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" />
            <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="배송번호 변경" />
          </div>
        </DashboardCard>
      </div>
    </div>
  ),
}

// 대시보드 레이아웃 예시
export const DashboardLayout: Story = {
  render: () => {
    const [filter, setFilter] = React.useState('최근 7일')
    return (
      <div style={{ display: 'flex', gap: '10px', width: '900px' }}>
        {/* 좌측: 메인 카드 */}
        <div style={{ flex: 1 }}>
          <DashboardCard
            icon={<InformationIcon size={24} />}
            title="전체"
            headerAction={
              <CardActionGroup
                options={['최근 7일', '최근 15일', '최근 30일']}
                value={filter}
                onValueChange={setFilter}
              />
            }
          >
            <StatCard variant="main" count="123,201" label="" />
          </DashboardCard>
        </div>
        {/* 우측: Sub + Small 카드들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '500px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <DashboardCard icon={<InformationIcon size={24} />} title="미입고">
                <StatCard variant="sub" count="01" label="" badge={<Badge variant="success-outline">양호</Badge>} />
              </DashboardCard>
            </div>
            <div style={{ flex: 1 }}>
              <DashboardCard icon={<InformationIcon size={24} />} title="입고">
                <StatCard variant="sub" count="02" label="" badge={<Badge variant="success-outline">양호</Badge>} />
              </DashboardCard>
            </div>
          </div>
          <DashboardCard
            icon={<InformationIcon size={24} />}
            title="필수 확인사항"
            headerAction={<CardAction>새로고침</CardAction>}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" />
              <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="배송번호 변경" />
            </div>
          </DashboardCard>
        </div>
      </div>
    )
  },
}
