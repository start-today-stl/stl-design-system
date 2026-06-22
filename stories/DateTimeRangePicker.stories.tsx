import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { DateTimeRangePicker } from "@/components/ui/date-time-range-picker";

const meta: Meta<typeof DateTimeRangePicker> = {
  title: "Components/DateTimeRangePicker",
  component: DateTimeRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateTimeRangePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[480px]">
        <DateTimeRangePicker
          label="기간"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>({
      from: new Date(2026, 2, 10, 9, 0, 0),
      to: new Date(2026, 2, 20, 18, 30, 0),
    });
    return (
      <div className="w-[480px]">
        <DateTimeRangePicker
          label="기간"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[480px]">
        <DateTimeRangePicker
          label="기간"
          required
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>(undefined);
    return (
      <div className="w-[480px]">
        <DateTimeRangePicker
          label="기간"
          required
          error
          errorMessage="시작/종료 일시를 선택해주세요."
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[480px]">
      <DateTimeRangePicker
        label="기간"
        disabled
        value={{
          from: new Date(2026, 2, 10, 9, 0, 0),
          to: new Date(2026, 2, 20, 18, 30, 0),
        }}
      />
    </div>
  ),
};
