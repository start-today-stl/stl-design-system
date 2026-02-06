import { jsx as a } from "react/jsx-runtime";
import * as d from "react";
import * as o from "@radix-ui/react-tooltip";
import { cn as n } from "../../lib/utils.mjs";
const l = o.Provider, f = o.Root, c = o.Trigger, s = d.forwardRef(({ className: t, sideOffset: e = 4, ...i }, r) => /* @__PURE__ */ a(
  o.Content,
  {
    ref: r,
    sideOffset: e,
    className: n(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      t
    ),
    ...i
  }
));
s.displayName = o.Content.displayName;
export {
  f as Tooltip,
  s as TooltipContent,
  l as TooltipProvider,
  c as TooltipTrigger
};
//# sourceMappingURL=tooltip.mjs.map
