import type { Meta, StoryObj } from '@storybook/react-vite'

import { SplashScreen } from '../src/components/ui/splash-screen'

/**
 * ## 언제 사용하나요?
 *
 * 전체화면 또는 모달 등의 전체 영역의 중앙에 넓게 표시되는 로딩 표시입니다.
 *
 * ### 애니메이션 타이밍
 * - **Default → Variant2**: 500ms (ease-out) - 회색에서 그라데이션으로
 * - **Variant2 → Variant3**: 500ms (ease-out) - 그라데이션에서 파란색으로
 * - **Variant3 대기**: 500ms
 * - **Variant3 → Default**: 1000ms (ease-out) - 파란색에서 회색으로
 *
 * ### 사용 예시
 * - 앱 초기 로딩 화면
 * - 모달 내부 로딩 상태
 * - 페이지 전환 시 로딩 상태
 */
const meta = {
  title: 'Components/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '전체화면 또는 모달 등의 전체 영역의 중앙에 넓게 표시되는 로딩 표시입니다.\n\n**애니메이션:** 2.5초 사이클로 회색 → 그라데이션 → 파란색 → 회색 순으로 전환됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: '로고 크기 (sm: 45x38, default: 90x76, lg: 180x152)',
    },
  },
} satisfies Meta<typeof SplashScreen>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 크기 (90x76) */
export const Default: Story = {
  args: {
    size: 'default',
  },
}

/** 작은 크기 (45x38) */
export const Small: Story = {
  args: {
    size: 'sm',
  },
}

/** 큰 크기 (180x152) */
export const Large: Story = {
  args: {
    size: 'lg',
  },
}

/** 모든 크기 비교 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <SplashScreen size="sm" />
        <span style={{ fontSize: '12px', color: '#666' }}>Small (45x38)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <SplashScreen size="default" />
        <span style={{ fontSize: '12px', color: '#666' }}>Default (90x76)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <SplashScreen size="lg" />
        <span style={{ fontSize: '12px', color: '#666' }}>Large (180x152)</span>
      </div>
    </div>
  ),
}

/** 전체 화면 로딩 예시 */
export const FullScreenExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '400px',
        height: '300px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <SplashScreen size="lg" />
      <p style={{ marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
        로딩 중...
      </p>
    </div>
  ),
}
