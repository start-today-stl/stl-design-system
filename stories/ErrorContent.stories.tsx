import type { Meta, StoryObj } from "@storybook/react-vite"
import { ErrorContent } from "../src/components/ui/error-content"
import { ProcessingIcon } from "../src/icons"

const meta = {
  title: "Components/ErrorContent",
  component: ErrorContent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    code: {
      control: "text",
      description: "에러 코드 (404, 500, ERROR 등)",
    },
    title: {
      control: "text",
      description: "에러 타이틀",
    },
    description: {
      control: "text",
      description: "상세 설명 (줄바꿈: \\n)",
    },
    backLabel: {
      control: "text",
      description: "이전 버튼 라벨",
    },
    primaryLabel: {
      control: "text",
      description: "주요 버튼 라벨",
    },
    hideBackButton: {
      control: "boolean",
      description: "이전 버튼 숨기기",
    },
    hidePrimaryButton: {
      control: "boolean",
      description: "주요 버튼 숨기기",
    },
  },
} satisfies Meta<typeof ErrorContent>

export default meta
type Story = StoryObj<typeof meta>

/** 404 Not Found - 페이지를 찾을 수 없음 */
export const NotFound: Story = {
  args: {
    code: "404",
    title: "NOT FOUND :(",
    description: "페이지가 응답하지 않습니다.\n이전 단계로 돌아가세요.",
    onBack: () => alert("이전으로 돌아가기"),
    onPrimary: () => alert("홈으로 돌아가기"),
  },
}

/** 500 Server Error - 서버 오류 */
export const ServerError: Story = {
  args: {
    code: "500",
    title: "SERVER ERROR :(",
    description: "서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.",
    onBack: () => alert("이전으로 돌아가기"),
    onPrimary: () => alert("홈으로 돌아가기"),
  },
}

/** 403 Forbidden - 접근 권한 없음 */
export const Forbidden: Story = {
  args: {
    code: "403",
    title: "ACCESS DENIED :(",
    description: "접근 권한이 없습니다.\n관리자에게 문의하세요.",
    onBack: () => alert("이전으로 돌아가기"),
    onPrimary: () => alert("홈으로 돌아가기"),
  },
}

/** Error Boundary - 런타임 에러 (커스텀 아이콘) */
export const RuntimeError: Story = {
  args: {
    code: "ERROR",
    title: "오류가 발생했습니다 :(",
    description: "예기치 않은 오류가 발생했습니다.\n페이지를 새로고침 해주세요.",
    primaryLabel: "새로고침",
    primaryIcon: <ProcessingIcon size={24} />,
    hideBackButton: true,
    onPrimary: () => alert("새로고침"),
  },
}

/** API 404 - 데이터를 찾을 수 없음 */
export const DataNotFound: Story = {
  args: {
    code: "404",
    title: "DATA NOT FOUND :(",
    description: "요청하신 데이터를 찾을 수 없습니다.",
    backLabel: "목록으로 돌아가기",
    onBack: () => alert("목록으로 돌아가기"),
    onPrimary: () => alert("홈으로 돌아가기"),
  },
}

/** 버튼 없이 메시지만 표시 */
export const MessageOnly: Story = {
  args: {
    code: "OOPS!",
    title: "SOMETHING WENT WRONG :(",
    description: "문제가 발생했습니다.",
    hideBackButton: true,
    hidePrimaryButton: true,
  },
}
