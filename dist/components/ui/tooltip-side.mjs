import { jsx as e, jsxs as a } from "react/jsx-runtime";
import * as n from "react";
import { Provider as m, Root as h, Trigger as c, Content as d } from "../../node_modules/@radix-ui/react-tooltip/dist/index.mjs";
import { cn as x } from "../../lib/utils.mjs";
import { Button as i } from "./button.mjs";
const f = m, l = h, s = c, r = n.forwardRef(({ className: t, sideOffset: b = 4, ...o }, p) => /* @__PURE__ */ e(
  d,
  {
    ref: p,
    sideOffset: b + 14,
    className: x(
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
      t
    ),
    ...o,
    children: o.children
  }
));
r.displayName = d.displayName;
function N() {
  return /* @__PURE__ */ e(f, { children: /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2", children: ["left", "top", "bottom", "right"].map((t) => /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e(s, { asChild: !0, children: /* @__PURE__ */ e(i, { variant: "outline", className: "w-fit capitalize", children: t }) }),
    /* @__PURE__ */ e(r, { side: t, children: /* @__PURE__ */ e("p", { children: "Contents Name" }) })
  ] }, t)) }) });
}
function T({ side: t }) {
  return /* @__PURE__ */ e(f, { children: /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e(s, { asChild: !0, children: /* @__PURE__ */ e(i, { variant: "outline", className: "w-fit capitalize", children: t }) }),
    /* @__PURE__ */ e(r, { side: t, children: /* @__PURE__ */ e("p", { children: "Contents Name" }) })
  ] }) });
}
export {
  l as Tooltip,
  r as TooltipContent,
  f as TooltipProvider,
  T as TooltipSide,
  N as TooltipSides,
  s as TooltipTrigger
};
//# sourceMappingURL=tooltip-side.mjs.map
