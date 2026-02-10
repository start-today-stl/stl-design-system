import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
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
type Story = StoryObj<typeof DateRangePicker>;

/** 기본 DateRangePicker */
export const Default: Story = {
  render: function Render(args) {
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <DateRangePicker
        {...args}
        value={range}
        onChange={setRange}
      />
    );
  },
  args: {
    label: "기간",
    placeholder: "yyyy-mm-dd - yyyy-mm-dd",
    size: "lg",
  },
};

/** 날짜 범위가 선택된 상태 */
export const WithValue: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });

    return (
      <DateRangePicker
        label="기간"
        value={range}
        onChange={setRange}
        size="lg"
      />
    );
  },
};

/** 에러 상태 */
export const Error: Story = {
  args: {
    label: "기간",
    error: true,
    errorMessage: "기간을 선택해주세요.",
    size: "lg",
  },
};

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    label: "기간",
    disabled: true,
    size: "lg",
  },
};

/** 다양한 크기 */
export const AllSizes: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">sm (160px)</span>
          <DateRangePicker label="기간" size="sm" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">md (260px)</span>
          <DateRangePicker label="기간" size="md" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">lg (360px)</span>
          <DateRangePicker label="기간" size="lg" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-500">full (100%)</span>
          <div className="w-[500px]">
            <DateRangePicker label="기간" size="full" />
          </div>
        </div>
      </div>
    );
  },
};

/** 직접 입력 테스트 */
export const ManualInput: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <DateRangePicker
          label="기간 직접 입력"
          value={range}
          onChange={setRange}
          size="lg"
          placeholder="2025-01-01 - 2025-01-31"
        />
        <div className="text-sm text-slate-500">
          선택된 기간:{" "}
          {range?.from && range?.to
            ? `${range.from.toLocaleDateString("ko-KR")} ~ ${range.to.toLocaleDateString("ko-KR")}`
            : "없음"}
        </div>
      </div>
    );
  },
};
