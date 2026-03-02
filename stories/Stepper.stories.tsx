import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stepper, type StepItem } from '../src/components/ui/stepper'
import { Button } from '../src/components/ui/button'
import { WriteIcon, SettingsIcon, OIcon, PageIcon } from '../src/icons'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 4 },
      description: '현재 활성화된 Step 인덱스 (0부터 시작)',
    },
    showCheckOnCompleted: {
      control: 'boolean',
      description: '완료된 Step에 체크 아이콘 표시 여부',
    },
  },
  args: {
    currentStep: 0,
    showCheckOnCompleted: true,
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

// 기본 스텝 데이터
const defaultSteps: StepItem[] = [
  { label: '행사 등록' },
  { label: '상품 설정' },
  { label: '타입 설정' },
  { label: '등록 완료' },
]

// 아이콘이 있는 스텝 데이터
const stepsWithIcons: StepItem[] = [
  { label: '행사 등록', icon: <WriteIcon size={14} /> },
  { label: '상품 설정', icon: <PageIcon size={14} /> },
  { label: '타입 설정', icon: <SettingsIcon size={14} /> },
  { label: '등록 완료', icon: <OIcon size={14} /> },
]

// 기본 예제 (첫 번째 단계)
export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
  },
}

// 두 번째 단계 진행 중
export const SecondStep: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
  },
}

// 세 번째 단계 진행 중
export const ThirdStep: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
  },
}

// 마지막 단계 (완료)
export const LastStep: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 3,
  },
}

// 모두 완료
export const AllCompleted: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 4,
  },
}

// 아이콘 포함
export const WithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    currentStep: 1,
    showCheckOnCompleted: false,
  },
}

// 체크 아이콘 없이
export const WithoutCheckIcon: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    showCheckOnCompleted: false,
  },
}

// 인터랙티브 예제
export const Interactive: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
  },
  render: function Render() {
    const [currentStep, setCurrentStep] = React.useState(0)
    const steps = defaultSteps

    return (
      <div className="flex flex-col gap-6">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="flex gap-2 justify-center">
          <Button
            variant="ghost-outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            이전
          </Button>
          <Button
            onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
            disabled={currentStep > steps.length - 1}
          >
            다음
          </Button>
        </div>

        <p className="text-center text-sm text-slate-500">
          현재 단계: {currentStep + 1} / {steps.length}
          {currentStep >= steps.length && ' (모두 완료)'}
        </p>
      </div>
    )
  },
}

// 3단계 예제
export const ThreeSteps: Story = {
  args: {
    steps: [
      { label: '정보 입력' },
      { label: '검토' },
      { label: '완료' },
    ],
    currentStep: 1,
  },
}

// 5단계 예제
export const FiveSteps: Story = {
  args: {
    steps: [
      { label: '주문' },
      { label: '결제' },
      { label: '배송준비' },
      { label: '배송중' },
      { label: '배송완료' },
    ],
    currentStep: 2,
  },
}
