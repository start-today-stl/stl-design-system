import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";

const meta: Meta<typeof DateTimePicker> = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
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
      description: "날짜/시간 포맷 (date-fns 형식)",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

/** 기본 DateTimePicker */
export const Default: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={setDate}
      />
    );
  },
  args: {
    label: "날짜/시간",
    placeholder: "yyyy-mm-dd 00:00:00",
    size: "md",
  },
};

/** 날짜/시간이 선택된 상태 */
export const WithValue: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <DateTimePicker
        label="날짜/시간"
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
    label: "날짜/시간",
    error: true,
    errorMessage: "날짜와 시간을 선택해주세요.",
    size: "md",
  },
};

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    label: "날짜/시간",
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
          <DateTimePicker label="날짜/시간" size="sm" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">md (260px)</span>
          <DateTimePicker label="날짜/시간" size="md" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">lg (360px)</span>
          <DateTimePicker label="날짜/시간" size="lg" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">full (100%)</span>
          <div className="w-[400px]">
            <DateTimePicker label="날짜/시간" size="full" />
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
        <DateTimePicker
          label="날짜/시간 직접 입력"
          value={date}
          onChange={setDate}
          size="lg"
          placeholder="2025-12-25 14:30:00"
        />
        <div className="text-sm text-slate-500">
          선택된 날짜/시간:{" "}
          {date ? date.toLocaleString("ko-KR") : "없음"}
        </div>
      </div>
    );
  },
};
