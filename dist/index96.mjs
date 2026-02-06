import { jsx as a } from "react/jsx-runtime";
import * as d from "react";
import { Root as s, Provider as n, Trigger as m, Content as o } from "./index139.mjs";
import { cn as p } from "./index105.mjs";
const x = n, T = s, u = m, l = d.forwardRef(({ className: t, sideOffset: e = 4, ...i }, r) => /* @__PURE__ */ a(
  o,
  {
    ref: r,
    sideOffset: e,
    className: p(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
      t
    ),
    ...i
  }
));
l.displayName = o.displayName;
export {
  T as Tooltip,
  l as TooltipContent,
  x as TooltipProvider,
  u as TooltipTrigger
};
//# sourceMappingURL=index96.mjs.map
