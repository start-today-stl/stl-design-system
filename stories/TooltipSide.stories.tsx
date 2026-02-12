import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipArrowContent,
  TooltipProvider,
} from "@/components/ui/tooltip-side";
import { Button } from "@/components/ui/button";

const meta: Meta = {
  title: "Components/TooltipArrow",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** 모든 방향 (말풍선 화살표 포함) */
export const AllSides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="ghost-outline" className="capitalize">
                {side}
              </Button>
            </TooltipTrigger>
            <TooltipArrowContent side={side}>
              <p>툴팁 내용</p>
            </TooltipArrowContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};

/** 단일 방향 예시 */
export const Top: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost-outline">위로 툴팁</Button>
        </TooltipTrigger>
        <TooltipArrowContent side="top">
          <p>위쪽에 표시되는 툴팁</p>
        </TooltipArrowContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
