import { jsx as o } from "react/jsx-runtime";
import * as d from "react";
import * as i from "@radix-ui/react-tooltip";
import { cn as f } from "../../lib/utils.mjs";
const s = d.forwardRef(({ className: t, sideOffset: e = 4, ...r }, a) => /* @__PURE__ */ o(
  i.Content,
  {
    ref: a,
    sideOffset: e + 14,
    className: f(
      "z-50 rounded-md border bg-popover px-4 py-2.5 text-sm text-popover-foreground shadow-[10px_10px_10px_0px_#0000001A] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      "relative overflow-visible",
      "after:absolute after:border-[10px] after:border-transparent after:content-['']",
      "before:absolute before:border-[11px] before:border-transparent before:content-['']",
      // Top arrow
      "data-[side=top]:after:left-1/2 data-[side=top]:after:top-full data-[side=top]:after:-ml-[10px] data-[side=top]:after:border-t-white data-[side=top]:after:border-t-[18px] dark:data-[side=top]:after:border-t-[var(--color-slate-900)]",
      "data-[side=top]:before:left-1/2 data-[side=top]:before:top-full data-[side=top]:before:-ml-[11px] data-[side=top]:before:border-t-border data-[side=top]:before:border-t-[19px]",
      // Bottom arrow
      "data-[side=bottom]:after:bottom-full data-[side=bottom]:after:left-1/2 data-[side=bottom]:after:-ml-[10px] data-[side=bottom]:after:border-b-white data-[side=bottom]:after:border-b-[18px] dark:data-[side=bottom]:after:border-b-[var(--color-slate-900)]",
      "data-[side=bottom]:before:bottom-full data-[side=bottom]:before:left-1/2 data-[side=bottom]:before:-ml-[11px] data-[side=bottom]:before:border-b-border data-[side=bottom]:before:border-b-[19px]",
      // Left arrow
      "data-[side=left]:after:left-full data-[side=left]:after:top-1/2 data-[side=left]:after:-mt-[10px] data-[side=left]:after:border-l-white data-[side=left]:after:border-l-[18px] dark:data-[side=left]:after:border-l-[var(--color-slate-900)]",
      "data-[side=left]:before:left-full data-[side=left]:before:top-1/2 data-[side=left]:before:-mt-[11px] data-[side=left]:before:border-l-border data-[side=left]:before:border-l-[19px]",
      // Right arrow
      "data-[side=right]:after:right-full data-[side=right]:after:top-1/2 data-[side=right]:after:-mt-[10px] data-[side=right]:after:border-r-white data-[side=right]:after:border-r-[18px] dark:data-[side=right]:after:border-r-[var(--color-slate-900)]",
      "data-[side=right]:before:right-full data-[side=right]:before:top-1/2 data-[side=right]:before:-mt-[11px] data-[side=right]:before:border-r-border data-[side=right]:before:border-r-[19px]",
      t
    ),
    ...r
  }
));
s.displayName = "TooltipArrowContent";
export {
  s as TooltipArrowContent
};
//# sourceMappingURL=tooltip-side.mjs.map
