import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Step 상태 */
export type StepStatus = "completed" | "active" | "pending"

/** Step 아이템 타입 */
export interface StepItem {
  /** 라벨 텍스트 */
  label: string
  /** 아이콘 (선택사항) */
  icon?: React.ReactNode
  /** 상태 (자동 계산 가능) */
  status?: StepStatus
}

/** Step 원형 아이콘 variants */
const stepCircleVariants = cva(
  "flex items-center justify-center size-7 rounded-full transition-colors",
  {
    variants: {
      status: {
        completed: "bg-blue-500 text-white",
        active: "bg-blue-500 text-white",
        pending: "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
)

/** Step 라벨 variants */
const stepLabelVariants = cva(
  "text-base font-semibold tracking-[-0.16px] leading-[1.3] text-center whitespace-nowrap",
  {
    variants: {
      status: {
        completed: "text-gray-900 dark:text-gray-100",
        active: "text-gray-900 dark:text-gray-100",
        pending: "text-gray-400 dark:text-gray-500",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
)

/** 연결 라인 variants */
const stepLineVariants = cva("h-px flex-1 transition-colors", {
  variants: {
    completed: {
      true: "bg-blue-500",
      false: "bg-gray-200 dark:bg-gray-700",
    },
  },
  defaultVariants: {
    completed: false,
  },
})

/** 체크 아이콘 (완료 상태용) */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4", className)}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepCircleVariants> {
  /** Step 아이템 목록 */
  steps: StepItem[]
  /** 현재 활성 Step 인덱스 (0부터 시작) */
  currentStep?: number
  /** 완료된 Step에 체크 아이콘 표시 여부 */
  showCheckOnCompleted?: boolean
}

/** 개별 Step 계산 - 상태 결정 */
function getStepStatus(
  index: number,
  currentStep: number,
  itemStatus?: StepStatus
): StepStatus {
  // 명시적으로 상태가 지정되어 있으면 그것을 사용
  if (itemStatus) return itemStatus

  // currentStep 기준으로 자동 계산
  if (index < currentStep) return "completed"
  if (index === currentStep) return "active"
  return "pending"
}

export function Stepper({
  steps,
  currentStep = 0,
  showCheckOnCompleted = true,
  className,
  ...props
}: StepperProps) {
  return (
    <div
      className={cn("flex items-start w-full", className)}
      role="navigation"
      aria-label="Progress"
      {...props}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index, currentStep, step.status)
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            {/* Step 아이템 */}
            <div className="flex flex-col items-center gap-3.5">
              {/* 원형 아이콘 */}
              <div
                className={cn(stepCircleVariants({ status }))}
                aria-current={status === "active" ? "step" : undefined}
              >
                {status === "completed" && showCheckOnCompleted ? (
                  <CheckIcon />
                ) : step.icon ? (
                  step.icon
                ) : null}
              </div>

              {/* 라벨 */}
              <span className={cn(stepLabelVariants({ status }))}>
                {step.label}
              </span>
            </div>

            {/* 연결 라인 (마지막 아이템 제외) */}
            {!isLast && (
              <div className="flex-1 flex items-center pt-3.5 px-2">
                <div
                  className={cn(
                    stepLineVariants({ completed: status === "completed" })
                  )}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

Stepper.displayName = "Stepper"

export { stepCircleVariants, stepLabelVariants, stepLineVariants }
