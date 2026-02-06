import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
// TODO: DatePicker 컴포넌트 구현 시 CalenderIcon으로 교체
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { InputField } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { STLArrowIcon } from "@/icons";

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
    title: {
      control: "text",
      description: "모달 제목",
    },
    description: {
      control: "text",
      description: "모달 설명",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 모달 (버튼 2개 - 양쪽 배치) */
export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size="m"
          title="모달 제목"
          description="모달에 대한 설명을 입력합니다."
          footer={
            <>
              <Button variant="basic" onClick={() => setOpen(false)}>취소</Button>
              <Button variant="action">확인</Button>
            </>
          }
        >
          <p className="text-sm text-gray-500">모달 본문 내용입니다.</p>
        </Modal>
      </>
    );
  },
};

/** 버튼 1개 (오른쪽 정렬) */
export const SingleButton: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>알림 모달</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size="s"
          title="알림"
          description="작업이 완료되었습니다."
          footer={<Button variant="action" onClick={() => setOpen(false)}>확인</Button>}
        >
          <p className="text-sm text-gray-500">성공적으로 처리되었습니다.</p>
        </Modal>
      </>
    );
  },
};

/** 헤더에 아이콘이 포함된 모달 */
export const WithHeaderIcon: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>비밀번호 변경</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size="s"
          title={
            <span className="flex items-center justify-between w-full">
              비밀번호 변경
              <STLArrowIcon size={29} className="text-gray-100" />
            </span>
          }
          footer={
            <>
              <Button variant="basic" onClick={() => setOpen(false)}>닫기</Button>
              <Button variant="action">변경</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <InputField label="기존 비밀번호" placeholder="내용을 입력하세요." />
            <InputField label="새 비밀번호" placeholder="내용을 입력하세요." />
            <InputField label="비밀번호 확인" placeholder="내용을 입력하세요." />
          </div>
        </Modal>
      </>
    );
  },
};

/** 폼이 포함된 모달 (Input, Dropdown, DatePicker 예시) */
export const WithForm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>();

    return (
      <>
        <Button onClick={() => setOpen(true)}>등록 모달</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size="l"
          title="입고 등록"
          description="입고 정보를 입력하여 등록해 주세요."
          footer={
            <>
              <Button variant="basic" onClick={() => setOpen(false)}>닫기</Button>
              <Button variant="action">등록</Button>
            </>
          }
        >
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* DatePicker */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">입고일자</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-9",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ko }) : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            {/* InputField */}
            <InputField label="입고번호" placeholder="입고번호 입력" />
            {/* Dropdown */}
            <Dropdown
              label="센터"
              placeholder="센터 선택"
              options={[
                { label: "A 센터", value: "center-a" },
                { label: "B 센터", value: "center-b" },
              ]}
            />
            <Dropdown
              label="파트"
              placeholder="파트 선택"
              options={[
                { label: "파트 1", value: "part-1" },
                { label: "파트 2", value: "part-2" },
              ]}
            />
            <InputField label="입고수량" type="number" placeholder="0" />
            <InputField label="비고" placeholder="비고 입력" />
          </div>
        </Modal>
      </>
    );
  },
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: function Render() {
    const [openSize, setOpenSize] = useState<"s" | "m" | "l" | "xl" | null>(null);

    return (
      <div className="flex gap-2">
        {(["s", "m", "l", "xl"] as const).map((size) => (
          <Button key={size} onClick={() => setOpenSize(size)}>
            {size.toUpperCase()}
          </Button>
        ))}
        {openSize && (
          <Modal
            open={!!openSize}
            onOpenChange={(open) => !open && setOpenSize(null)}
            size={openSize}
            title={`${openSize.toUpperCase()} 사이즈 모달`}
            description="모달 크기를 확인하세요."
            footer={
              <>
                <Button variant="basic" onClick={() => setOpenSize(null)}>닫기</Button>
                <Button variant="action">확인</Button>
              </>
            }
          >
            <p className="text-sm text-gray-500">
              현재 사이즈: <strong>{openSize.toUpperCase()}</strong>
            </p>
          </Modal>
        )}
      </div>
    );
  },
};
