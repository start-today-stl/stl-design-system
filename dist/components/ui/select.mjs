import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as s from "react";
import * as e from "@radix-ui/react-select";
import { Check as f, ChevronDown as i, ChevronUp as u } from "lucide-react";
import { cn as l } from "../../lib/utils.mjs";
const v = e.Root, R = e.Group, C = e.Value, h = s.forwardRef(({ className: o, children: r, ...a }, d) => /* @__PURE__ */ n(
  e.Trigger,
  {
    ref: d,
    className: l(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      o
    ),
    ...a,
    children: [
      r,
      /* @__PURE__ */ t(e.Icon, { asChild: !0, children: /* @__PURE__ */ t(i, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
h.displayName = e.Trigger.displayName;
const c = s.forwardRef(({ className: o, ...r }, a) => /* @__PURE__ */ t(
  e.ScrollUpButton,
  {
    ref: a,
    className: l(
      "flex cursor-default items-center justify-center py-1",
      o
    ),
    ...r,
    children: /* @__PURE__ */ t(u, { className: "h-4 w-4" })
  }
));
c.displayName = e.ScrollUpButton.displayName;
const m = s.forwardRef(({ className: o, ...r }, a) => /* @__PURE__ */ t(
  e.ScrollDownButton,
  {
    ref: a,
    className: l(
      "flex cursor-default items-center justify-center py-1",
      o
    ),
    ...r,
    children: /* @__PURE__ */ t(i, { className: "h-4 w-4" })
  }
));
m.displayName = e.ScrollDownButton.displayName;
const g = s.forwardRef(({ className: o, children: r, position: a = "popper", ...d }, p) => /* @__PURE__ */ t(e.Portal, { children: /* @__PURE__ */ n(
  e.Content,
  {
    ref: p,
    className: l(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      a === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      o
    ),
    position: a,
    ...d,
    children: [
      /* @__PURE__ */ t(c, {}),
      /* @__PURE__ */ t(
        e.Viewport,
        {
          className: l(
            "p-1",
            a === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ t(m, {})
    ]
  }
) }));
g.displayName = e.Content.displayName;
const y = s.forwardRef(({ className: o, ...r }, a) => /* @__PURE__ */ t(
  e.Label,
  {
    ref: a,
    className: l("py-1.5 pl-8 pr-2 text-sm font-semibold", o),
    ...r
  }
));
y.displayName = e.Label.displayName;
const w = s.forwardRef(({ className: o, children: r, ...a }, d) => /* @__PURE__ */ n(
  e.Item,
  {
    ref: d,
    className: l(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      o
    ),
    ...a,
    children: [
      /* @__PURE__ */ t("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ t(e.ItemIndicator, { children: /* @__PURE__ */ t(f, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ t(e.ItemText, { children: r })
    ]
  }
));
w.displayName = e.Item.displayName;
const N = s.forwardRef(({ className: o, ...r }, a) => /* @__PURE__ */ t(
  e.Separator,
  {
    ref: a,
    className: l("-mx-1 my-1 h-px bg-muted", o),
    ...r
  }
));
N.displayName = e.Separator.displayName;
export {
  v as Select,
  g as SelectContent,
  R as SelectGroup,
  w as SelectItem,
  y as SelectLabel,
  m as SelectScrollDownButton,
  c as SelectScrollUpButton,
  N as SelectSeparator,
  h as SelectTrigger,
  C as SelectValue
};
//# sourceMappingURL=select.mjs.map
