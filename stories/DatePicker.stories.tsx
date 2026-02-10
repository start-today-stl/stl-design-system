import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "너비 크기",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    label: {
      control: "text",
      description: "라벨 텍스트",
    },
    placeholder: {
      control: "text",
      description: "placeholder 텍스트",
    },
    dateFormat: {
      control: "text",
      description: "날짜 포맷 (date-fns 형식)",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/** 기본 DatePicker */
export const Default: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <DatePicker
        {...args}
        value={date}
        onChange={setDate}
      />
    );
  },
  args: {
    label: "날짜",
    placeholder: "yyyy-mm-dd",
    size: "md",
  },
};

/** 날짜가 선택된 상태 */
export const WithValue: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <DatePicker
        label="날짜"
        value={date}
        onChange={setDate}
        size="md"
      />
    );
  },
};

/** 에러 상태 */
export const Error: Story = {
  args: {
    label: "날짜",
    error: true,
    errorMessage: "날짜를 선택해주세요.",
    size: "md",
  },
};

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    label: "날짜",
    disabled: true,
    size: "md",
  },
};

/** 다양한 크기 */
export const AllSizes: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">sm (160px)</span>
          <DatePicker label="날짜" size="sm" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">md (260px)</span>
          <DatePicker label="날짜" size="md" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">lg (360px)</span>
          <DatePicker label="날짜" size="lg" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">full (100%)</span>
          <div className="w-[400px]">
            <DatePicker label="날짜" size="full" />
          </div>
        </div>
      </div>
    );
  },
};

/** 직접 입력 테스트 */
export const ManualInput: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <DatePicker
          label="날짜 직접 입력"
          value={date}
          onChange={setDate}
          size="md"
          placeholder="2025-12-25"
        />
        <div className="text-sm text-slate-500">
          선택된 날짜: {date ? date.toLocaleDateString("ko-KR") : "없음"}
        </div>
      </div>
    );
  },
};
