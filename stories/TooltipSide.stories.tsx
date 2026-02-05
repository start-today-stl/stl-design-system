import type { Meta, StoryObj } from "@storybook/react";
import { TooltipSide, TooltipSides } from "@/components/ui/tooltip-side";

const meta = {
  title: "Components/TooltipSides",
  component: TooltipSide,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "툴팁이 나타날 방향을 설정합니다.",
    },
  },
} satisfies Meta<typeof TooltipSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSides: Story = {
  render: () => <TooltipSides />,
};
