import type { Meta, StoryObj } from "@storybook/react"
import { Toaster, toast } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
    docs: {
      // Docs에서는 각 스토리를 iframe으로 격리
      story: { inline: false, height: "200px" },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="top-right" />
      </>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** 성공 토스트 */
export const Success: Story = {
  render: () => (
    <Button
      variant="success"
      onClick={() => toast.success("프로세스가 완료되었습니다.")}
    >
      성공 토스트
    </Button>
  ),
}

/** 에러 토스트 */
export const Error: Story = {
  render: () => (
    <Button
      variant="danger"
      onClick={() => toast.error("프로세스가 완료되지 않았습니다.")}
    >
      에러 토스트
    </Button>
  ),
}

/** 로딩 토스트 */
export const Loading: Story = {
  render: () => (
    <Button
      onClick={() => {
        const toastId = toast.loading("프로세스가 진행중입니다.")
        // 2초 후 성공으로 변경
        setTimeout(() => {
          toast.dismiss(toastId)
          toast.success("프로세스가 완료되었습니다.")
        }, 2000)
      }}
    >
      로딩 토스트
    </Button>
  ),
}

/** 설명 포함 토스트 (Large) */
export const WithDescription: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="danger"
        onClick={() =>
          toast.error("프로세스가 완료되지 않았습니다.", {
            description: "프로세스가 완료되지 않았으니 다시 실행해주세요.",
          })
        }
      >
        에러 + 설명
      </Button>
      <Button
        variant="success"
        onClick={() =>
          toast.success("프로세스가 완료되었습니다.", {
            description: "모든 작업이 성공적으로 처리되었습니다.",
          })
        }
      >
        성공 + 설명
      </Button>
      <Button
        onClick={() => {
          const toastId = toast.loading("프로세스가 진행중입니다.", {
            description: "진행중입니다.",
          })
          setTimeout(() => {
            toast.dismiss(toastId)
            toast.success("프로세스가 완료되었습니다.", {
              description: "모든 작업이 성공적으로 처리되었습니다.",
            })
          }, 2000)
        }}
      >
        로딩 + 설명
      </Button>
    </div>
  ),
}

/** 긴 텍스트 토스트 */
export const LongText: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="danger"
        onClick={() => toast.error("출력 가능한 송장이 없습니다. 실패 건 재접수 후 다시 시도해 주세요.")}
      >
        긴 에러 메시지
      </Button>
      <Button
        variant="success"
        onClick={() => toast.success("주문 데이터 일괄 처리가 완료되었습니다. 총 128건이 성공적으로 반영되었습니다.")}
      >
        긴 성공 메시지
      </Button>
    </div>
  ),
}

/** 모든 타입 비교 */
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="success" onClick={() => toast.success("성공 메시지")}>
        성공
      </Button>
      <Button variant="danger" onClick={() => toast.error("에러 메시지")}>
        에러
      </Button>
      <Button onClick={() => toast.loading("로딩 메시지")}>로딩</Button>
    </div>
  ),
}
