import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from '../src/components/ui/spinner'

/**
 * ## 언제 사용하나요?
 *
 * 작업의 전체 양이나 완료 시점을 예측할 수 없을 때 사용합니다.
 *
 * ### 시간
 * - 주로 **3초 미만**의 짧은 대기 시간에 사용
 *
 * ### 맥락
 * - **버튼 내부**: 버튼 클릭 후 로딩 상태 표시
 * - **리스트 로딩**: 데이터 불러오는 중 표시
 * - **특정 컴포넌트 단위**의 가벼운 프로세스에 사용
 *
 * ### 사용 예시
 * - 버튼 클릭 후 API 응답 대기
 * - 페이지 내 특정 영역 데이터 로딩
 * - 폼 제출 후 처리 대기
 *
 * ## Loading Bar(Slider)와의 차이
 *
 * | 상황 | 컴포넌트 |
 * |------|----------|
 * | 진행률을 알 수 없음 | **Spinner** |
 * | 진행률(%)을 보여줄 수 있음 | Loading Bar |
 * | 3초 미만 짧은 대기 | **Spinner** |
 * | 10초 이상 긴 작업 | Loading Bar |
 */
const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로딩 상태를 표시하는 스피너입니다. 작업의 전체 양이나 완료 시점을 예측할 수 없을 때 사용합니다.\n\n**시간:** 주로 3초 미만의 짧은 대기 시간에 사용합니다.\n\n**맥락:** 버튼 내부(클릭 후 로딩 상태), 리스트 로딩(데이터 불러오는 중) 등 특정 컴포넌트 단위의 가벼운 프로세스에 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: '스피너 크기 (default: 32px, sm: 18px)',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 스피너 (32px) */
export const Default: Story = {
  args: {
    size: 'default',
  },
}

// 작은 스피너 (18px)
export const Small: Story = {
  args: {
    size: 'sm',
  },
}

// 모든 크기 비교
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="sm" />
        <span style={{ fontSize: '12px', color: '#666' }}>Small (18px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="default" />
        <span style={{ fontSize: '12px', color: '#666' }}>Default (32px)</span>
      </div>
    </div>
  ),
}

/** 버튼 내 사용 예시 */
export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <button
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#1776FF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        disabled
      >
        <Spinner size="sm" className="text-white" />
        Loading...
      </button>
    </div>
  ),
}

/** 리스트 로딩 예시 */
export const ProcessLoading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#f1f5f9',
        borderRadius: '8px',
        width: '240px',
      }}
    >
      <Spinner size="default" />
      <div>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>
          프로세스가 진행중입니다.
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#475569' }}>
          진행중입니다.
        </p>
      </div>
    </div>
  ),
}
