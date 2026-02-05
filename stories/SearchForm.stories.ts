import type { Meta, StoryObj } from "@storybook/react";
import { SearchForm } from "@/layout/search-form";

const meta = {
  title: "Layout/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onSearch: { action: "searched" },
    onReset: { action: "reset" },
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "max-w-7xl",
  },
};
