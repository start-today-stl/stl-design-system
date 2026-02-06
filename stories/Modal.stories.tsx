import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["s", "m", "l", "xl"],
      description: "모달의 크기를 설정합니다.",
    },
    open: {
      control: "boolean",
      description: "모달의 열림 상태를 제어합니다.",
    },
    onOpenChange: {
      action: "openChanged",
      description: "모달 열림/닫힘 상태 변경 이벤트",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 모달을 열고 닫는 상태를 관리하는 래퍼 컴포넌트
const ModalWrapper = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-muted-foreground mb-4">
        아래 버튼을 클릭하여 <strong>{args.size.toUpperCase()}</strong> 사이즈
        모달을 확인하세요.
      </div>
      <Button onClick={() => setOpen(true)}>
        모달 열기 ({args.size.toUpperCase()})
      </Button>
      {/* 스토리북 args(Controls)로 전달된 open 상태가 있다면 우선시하거나, 내부 상태와 동기화할 수 있음 */}
      <Modal
        {...args}
        open={open || args.open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          args.onOpenChange?.(newOpen);
        }}
      />
    </div>
  );
};

export const Small: Story = {
  args: {
    size: "s",
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const Medium: Story = {
  args: {
    size: "m",
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const Large: Story = {
  args: {
    size: "l",
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
  render: (args) => <ModalWrapper {...args} />,
};
