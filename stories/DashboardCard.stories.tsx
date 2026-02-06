import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { DashboardCard } from '../src/dashboard/dashboard-card'
import { CardAction, CardActionGroup } from '../src/dashboard'
import { StatCard } from '../src/dashboard/stat-card'
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
  },
} satisfies Meta<typeof DashboardCard>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (헤더만)
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

// 필터 탭 포함
export const WithFilterTabs: Story = {
  render: () => {
    const [filter, setFilter] = React.useState('최근 7일')
    return (
      <div style={{ width: '500px' }}>
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
          <div style={{ fontSize: '14px', color: '#666' }}>
            선택된 필터: {filter}
          </div>
        </DashboardCard>
      </div>
    )
  },
}

// StatCard 메인 포함
export const WithMainStatCard: Story = {
  render: () => {
    const [filter, setFilter] = React.useState('최근 7일')
    return (
      <div style={{ width: '500px' }}>
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
          <StatCard
            variant="main"
            count="123,201"
            label=""
          />
        </DashboardCard>
      </div>
    )
  },
}

// StatCard Sub 포함
export const WithSubStatCards: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <DashboardCard
        icon={<InformationIcon size={24} />}
        title="입고 현황"
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <StatCard
              variant="sub"
              icon={<InformationIcon size={24} />}
              count="15"
              label="입고"
              badge={<Badge variant="success-outline">양호</Badge>}
            />
          </div>
          <div style={{ flex: 1 }}>
            <StatCard
              variant="sub"
              icon={<InformationIcon size={24} />}
              count="01"
              label="미입고"
              badge={<Badge variant="danger-outline">주의</Badge>}
            />
          </div>
        </div>
      </DashboardCard>
    </div>
  ),
}

// StatCard Small 포함
export const WithSmallStatCards: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <DashboardCard
        icon={<InformationIcon size={24} />}
        title="필수 확인사항"
        headerAction={<CardAction>새로고침</CardAction>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="주소지 오류" />
          <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="배송번호 변경" />
          <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="국내 반송 대기" />
        </div>
      </DashboardCard>
    </div>
  ),
}

// CS 현황 레이아웃 (Sub + Small 리스트 조합)
export const CSStatusLayout: Story = {
  render: () => {
    const [filter, setFilter] = React.useState('최근 7일')
    return (
      <div style={{ width: '900px' }}>
        <DashboardCard
          icon={<InformationIcon size={24} />}
          title="CS 현황"
          headerAction={
            <CardActionGroup
              options={['최근 7일', '최근 15일', '최근 30일']}
              value={filter}
              onValueChange={setFilter}
            />
          }
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* 왼쪽: Sub StatCard */}
            <div style={{ width: '200px' }}>
              <StatCard
                variant="sub"
                count="73"
                label="전체"
                badge={<Badge variant="danger-outline">긴급</Badge>}
              />
            </div>
            {/* 오른쪽: Small StatCard 리스트 두 열 */}
            <div style={{ flex: 1, display: 'flex', gap: '10px' }}>
              {/* 문의 열 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <StatCard variant="small" icon={<InformationIcon size={24} />} count="12" label="문의" bordered />
                <StatCard variant="small" count="2" label="미확인" bordered />
                <StatCard variant="small" count="9" label="진행중" bordered />
                <StatCard variant="small" count="1" label="완료" bordered />
              </div>
              {/* 요청 열 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <StatCard variant="small" icon={<InformationIcon size={24} />} count="3" label="요청" bordered />
                <StatCard variant="small" count="0" label="미확인" bordered />
                <StatCard variant="small" count="0" label="진행중" bordered />
                <StatCard variant="small" count="3" label="완료" bordered />
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    )
  },
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
            <StatCard
              variant="main"
              count="123,201"
              label=""
            />
          </DashboardCard>
        </div>
        {/* 우측: Sub + Small 카드들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '500px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <DashboardCard
                icon={<InformationIcon size={24} />}
                title="미입고"
              >
                <StatCard
                  variant="sub"
                  count="01"
                  label=""
                  badge={<Badge variant="success-outline">양호</Badge>}
                />
              </DashboardCard>
            </div>
            <div style={{ flex: 1 }}>
              <DashboardCard
                icon={<InformationIcon size={24} />}
                title="입고"
              >
                <StatCard
                  variant="sub"
                  count="02"
                  label=""
                  badge={<Badge variant="success-outline">양호</Badge>}
                />
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
              <StatCard variant="small" icon={<InformationIcon size={24} />} count="0건" label="국내 반송 대기" />
            </div>
          </DashboardCard>
        </div>
      </div>
    )
  },
}
