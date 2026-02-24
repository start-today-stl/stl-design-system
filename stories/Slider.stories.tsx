import * as React from "react"
import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "@/components/ui/slider"

/**
 * ## 언제 사용하나요?
 *
 * ### 슬라이더 (사용자 입력)
 * - 사용자가 **값을 직접 조절**해야 할 때 (볼륨, 밝기, 크기 등)
 * - **연속적인 값** 범위에서 선택이 필요할 때
 * - 즉각적인 피드백이 필요한 설정에 사용
 *
 * ### Loading Bar (진행률 표시)
 *
 * 작업의 시작과 끝이 명확하여 진행 상태(%)를 보여줄 수 있을 때 사용합니다.
 *
 * #### 시간
 * - **10초 이상** 소요되는 긴 작업에 권장
 * - 예: 파일 업로드, 다운로드, 대용량 데이터 처리
 *
 * #### 맥락
 * - 사용자가 **남은 시간을 인지**해야 하는 시스템 프로세스에 사용
 * - 진행률 숫자나 제어 버튼(일시정지, 취소 등)을 동반할 수 있음
 *
 * #### 사용 예시
 * - 파일 업로드/다운로드 진행률 표시
 * - 대용량 데이터 처리 상태 표시
 * - 설치/업데이트 진행 상태 표시
 *
 * #### 사용 방법
 * - `readonly` prop: 진행률 표시용으로 활용
 * - `showThumb={false}`: Thumb 없는 스타일(Type B)
 * - `showTooltip`: readonly일 때 현재 값이 항상 표시됨
 *
 * ## Spinner와의 차이
 *
 * | 상황 | 컴포넌트 |
 * |------|----------|
 * | 사용자가 값을 조절 | **Slider** |
 * | 진행률(%)을 보여줄 수 있음 | **Slider** (readonly) |
 * | 10초 이상 긴 작업 | **Slider** (readonly) |
 * | 진행률을 알 수 없음 | Spinner |
 * | 3초 미만 짧은 대기 | Spinner |
 */
const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "값을 조절하거나 진행률을 표시하는 슬라이더입니다. readonly 모드로 Loading Bar처럼 사용할 수 있습니다.\n\n**시간:** 10초 이상 소요되는 긴 작업(파일 업로드, 다운로드, 대용량 데이터 처리)에 권장됩니다.\n\n**맥락:** 사용자가 남은 시간을 인지해야 하는 시스템 프로세스에 사용하며, 진행률 숫자나 제어 버튼(일시정지, 취소 등)을 동반할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    readonly: {
      control: "boolean",
      description: "읽기 전용 모드 (진행률 표시용)",
    },
    showThumb: {
      control: "boolean",
      description: "Thumb 표시 여부",
    },
    showTooltip: {
      control: "boolean",
      description: "값 툴팁 표시",
    },
    showLabels: {
      control: "boolean",
      description: "min/max 라벨 표시",
    },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

/** 기본 슬라이더 */
export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} />
    </div>
  ),
}

/** 라벨 포함 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="볼륨" defaultValue={[50]} />
    </div>
  ),
}

/** 툴팁 표시 */
export const WithTooltip: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="밝기" defaultValue={[75]} showTooltip />
    </div>
  ),
}

/** Min/Max 라벨 표시 */
export const WithLabels: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="투명도" defaultValue={[30]} showLabels />
    </div>
  ),
}

/** 툴팁 + Min/Max 라벨 모두 표시 */
export const WithTooltipAndLabels: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider
        label="크기 조절"
        defaultValue={[60]}
        showTooltip
        showLabels
      />
    </div>
  ),
}

/** 커스텀 범위 */
export const CustomRange: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider
        label="온도 (°C)"
        min={-10}
        max={40}
        defaultValue={[20]}
        showTooltip
        showLabels
      />
    </div>
  ),
}

/** 비활성화 */
export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider label="비활성화됨" defaultValue={[50]} disabled />
    </div>
  ),
}

/** Controlled */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState([25])

    return (
      <div className="w-[300px] flex flex-col gap-4">
        <Slider
          label="조절 가능"
          value={value}
          onValueChange={setValue}
          showTooltip
          showLabels
        />
        <p className="text-xs text-slate-500">현재 값: {value[0]}</p>
      </div>
    )
  },
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[300px]">
      <Slider label="기본" defaultValue={[50]} />
      <Slider label="툴팁 표시" defaultValue={[75]} showTooltip />
      <Slider label="라벨 표시" defaultValue={[30]} showLabels />
      <Slider
        label="툴팁 + 라벨"
        defaultValue={[60]}
        showTooltip
        showLabels
      />
      <Slider
        label="커스텀 범위"
        min={0}
        max={1000}
        defaultValue={[500]}
        showTooltip
        showLabels
      />
      <Slider label="비활성화" defaultValue={[50]} disabled />
    </div>
  ),
}

// ============================================
// 진행률 표시 (Progress Bar) 용도
// ============================================

/** 진행률 표시 - Type A (Thumb + 툴팁) */
export const ProgressTypeA: Story = {
  render: () => (
    <div className="w-[300px] flex flex-col gap-4">
      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">업로드가 진행중입니다.</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">업로드가 완료될 때까지 기다려주세요.</p>
        <Slider value={[68]} readonly showTooltip />
      </div>
    </div>
  ),
}

/** 진행률 표시 - Type B (Thumb 없음) */
export const ProgressTypeB: Story = {
  render: () => (
    <div className="w-[300px] flex flex-col gap-2">
      <div className="flex justify-between text-xs text-slate-600">
        <span>다운로드 중...</span>
        <span>45%</span>
      </div>
      <Slider value={[45]} readonly showThumb={false} />
    </div>
  ),
}

/** 진행률 애니메이션 예시 */
export const ProgressAnimated: Story = {
  render: function ProgressAnimatedExample() {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1))
      }, 50)
      return () => clearInterval(timer)
    }, [])

    return (
      <div className="w-[300px] flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-2">
            <span>Type A (Thumb 있음)</span>
            <span>{progress}%</span>
          </div>
          <Slider value={[progress]} readonly />
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-2">
            <span>Type B (Thumb 없음)</span>
            <span>{progress}%</span>
          </div>
          <Slider value={[progress]} readonly showThumb={false} />
        </div>
      </div>
    )
  },
}

/** 모든 타입 비교 */
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div>
        <p className="text-xs text-slate-500 mb-2">사용자 입력 (Slider)</p>
        <Slider defaultValue={[50]} showTooltip />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2">진행률 표시 - Type A (readonly)</p>
        <Slider value={[68]} readonly />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2">진행률 표시 - Type B (readonly, no thumb)</p>
        <Slider value={[68]} readonly showThumb={false} />
      </div>
    </div>
  ),
}
