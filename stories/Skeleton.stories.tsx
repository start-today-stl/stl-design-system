import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from '../src/components/ui/skeleton'

/**
 * ## 언제 사용하나요?
 *
 * 반복재생되는 루핑 스테이트 모션이며, 테이블이나 카드 UI 등에서 사용 가능합니다.
 *
 * ### 사용 예시
 * - 테이블 데이터 로딩 시 행 형태로 표시
 * - 카드 UI 로딩 시 카드 형태로 표시
 * - 리스트 아이템 로딩 시 각 요소 형태로 표시
 *
 * ### Spinner와의 차이
 * | 상황 | 컴포넌트 |
 * |------|----------|
 * | 콘텐츠 형태를 미리 보여줄 때 | **Skeleton** |
 * | 단순 로딩 표시만 필요할 때 | Spinner |
 */
const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '반복재생되는 루핑 스테이트 모션이며, 테이블이나 카드 UI 등에서 사용 가능합니다.\n\n**애니메이션:** 2초 간격으로 그라데이션이 디졸브되며 전환됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: '너비 (기본: 100%)',
    },
    height: {
      control: 'number',
      description: '높이 (기본: 18px)',
    },
    circle: {
      control: 'boolean',
      description: '원형 여부',
    },
    disableAnimation: {
      control: 'boolean',
      description: '애니메이션 비활성화',
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 스켈레톤 */
export const Default: Story = {
  args: {
    width: 200,
    height: 18,
  },
}

/** 다양한 크기 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Skeleton height={12} />
      <Skeleton height={18} />
      <Skeleton height={24} />
      <Skeleton height={40} />
    </div>
  ),
}

/** 원형 스켈레톤 (아바타용) */
export const Circle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Skeleton circle height={32} />
      <Skeleton circle height={48} />
      <Skeleton circle height={64} />
    </div>
  ),
}

/** 텍스트 블록 */
export const TextBlock: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
      <Skeleton height={18} width="80%" />
      <Skeleton height={18} />
      <Skeleton height={18} />
      <Skeleton height={18} width="60%" />
    </div>
  ),
}

/** 카드 스켈레톤 */
export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        padding: '16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        width: '300px',
      }}
    >
      <Skeleton height={160} style={{ marginBottom: '16px', borderRadius: '4px' }} />
      <Skeleton height={20} width="70%" style={{ marginBottom: '8px' }} />
      <Skeleton height={14} style={{ marginBottom: '4px' }} />
      <Skeleton height={14} width="90%" />
    </div>
  ),
}

/** 리스트 아이템 스켈레톤 */
export const ListItemSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Skeleton circle height={40} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton height={16} width="60%" />
            <Skeleton height={12} width="80%" />
          </div>
        </div>
      ))}
    </div>
  ),
}

/** 애니메이션 비활성화 */
export const NoAnimation: Story = {
  args: {
    width: 200,
    height: 18,
    disableAnimation: true,
  },
}
