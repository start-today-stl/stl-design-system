import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker } from "@/components/ui/time-picker";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
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
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    showSeconds: {
      control: "boolean",
      description: "초 단위 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

/** 기본 TimePicker */
export const Default: Story = {
  render: function Render(args) {
    const [time, setTime] = useState<string>("");

    return (
      <TimePicker
        {...args}
        value={time}
        onChange={setTime}
      />
    );
  },
  args: {
    label: "시간",
    size: "sm",
  },
};

/** 값이 있는 상태 */
export const WithValue: Story = {
  render: function Render() {
    const [time, setTime] = useState<string>("09:30:00");

    return (
      <TimePicker
        label="시간"
        value={time}
        onChange={setTime}
        size="sm"
      />
    );
  },
};

/** 초 단위 숨김 */
export const WithoutSeconds: Story = {
  render: function Render() {
    const [time, setTime] = useState<string>("14:30");

    return (
      <TimePicker
        label="시간"
        value={time}
        onChange={setTime}
        size="sm"
        showSeconds={false}
      />
    );
  },
};

/** 에러 상태 */
export const Error: Story = {
  args: {
    label: "시간",
    error: true,
    errorMessage: "시간을 선택해주세요.",
    size: "sm",
  },
};

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    label: "시간",
    disabled: true,
    size: "sm",
  },
};

/** 필수 입력 표시 */
export const Required: Story = {
  args: {
    label: "시간",
    size: "sm",
    required: true,
  },
};

/** 다양한 크기 */
export const AllSizes: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">sm (160px)</span>
          <TimePicker label="시간" size="sm" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">md (260px)</span>
          <TimePicker label="시간" size="md" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">lg (360px)</span>
          <TimePicker label="시간" size="lg" />
        </div>
      </div>
    );
  },
};

/** 선택 결과 표시 */
export const WithResult: Story = {
  render: function Render() {
    const [time, setTime] = useState<string>("");

    return (
      <div className="flex flex-col gap-4">
        <TimePicker
          label="시간 선택"
          value={time}
          onChange={setTime}
          size="sm"
        />
        <div className="text-sm text-slate-500">
          선택된 시간: {time || "없음"}
        </div>
      </div>
    );
  },
};
