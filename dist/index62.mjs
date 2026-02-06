import { jsx as o } from "react/jsx-runtime";
import * as n from "react";
import { Root as s, Trigger as m, Portal as p, Content as t } from "./index123.mjs";
import { cn as f } from "./index105.mjs";
const v = s, b = m, l = n.forwardRef(({ className: e, align: a = "center", sideOffset: r = 4, ...d }, i) => /* @__PURE__ */ o(p, { children: /* @__PURE__ */ o(
  t,
  {
    ref: i,
    align: a,
    sideOffset: r,
    className: f(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
      e
    ),
    ...d
  }
) }));
l.displayName = t.displayName;
export {
  v as Popover,
  l as PopoverContent,
  b as PopoverTrigger
};
//# sourceMappingURL=index62.mjs.map
