import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

/** 말풍선 화살표가 있는 TooltipContent (tooltip.tsx의 기본 TooltipContent와 다름) */
const TooltipArrowContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset + 14}
    className={cn(
      "z-50 rounded-md border border-[#e6e6e6] bg-white px-4 py-2.5 text-sm text-popover-foreground shadow-[10px_10px_10px_0px_#0000001A] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      "relative overflow-visible",
      "after:absolute after:border-[10px] after:border-transparent after:content-['']",
      "before:absolute before:border-[11px] before:border-transparent before:content-['']",
      "data-[side=top]:after:left-1/2 data-[side=top]:after:top-full data-[side=top]:after:-ml-[10px] data-[side=top]:after:border-t-white data-[side=top]:after:border-t-[18px]",
      "data-[side=top]:before:left-1/2 data-[side=top]:before:top-full data-[side=top]:before:-ml-[11px] data-[side=top]:before:border-t-[#e6e6e6] data-[side=top]:before:border-t-[19px]",
      "data-[side=bottom]:after:bottom-full data-[side=bottom]:after:left-1/2 data-[side=bottom]:after:-ml-[10px] data-[side=bottom]:after:border-b-white data-[side=bottom]:after:border-b-[18px]",
      "data-[side=bottom]:before:bottom-full data-[side=bottom]:before:left-1/2 data-[side=bottom]:before:-ml-[11px] data-[side=bottom]:before:border-b-[#e6e6e6] data-[side=bottom]:before:border-b-[19px]",
      "data-[side=left]:after:left-full data-[side=left]:after:top-1/2 data-[side=left]:after:-mt-[10px] data-[side=left]:after:border-l-white data-[side=left]:after:border-l-[18px]",
      "data-[side=left]:before:left-full data-[side=left]:before:top-1/2 data-[side=left]:before:-mt-[11px] data-[side=left]:before:border-l-[#e6e6e6] data-[side=left]:before:border-l-[19px]",
      "data-[side=right]:after:right-full data-[side=right]:after:top-1/2 data-[side=right]:after:-mt-[10px] data-[side=right]:after:border-r-white data-[side=right]:after:border-r-[18px]",
      "data-[side=right]:before:right-full data-[side=right]:before:top-1/2 data-[side=right]:before:-mt-[11px] data-[side=right]:before:border-r-[#e6e6e6] data-[side=right]:before:border-r-[19px]",
      className,
    )}
    {...props}
  />
));
TooltipArrowContent.displayName = "TooltipArrowContent";

export {
  Tooltip,
  TooltipTrigger,
  TooltipArrowContent,
  TooltipProvider,
};
