import { jsx as t, jsxs as d } from "react/jsx-runtime";
import * as n from "react";
import { Root as m, Content as i, Item as l, Header as f, Trigger as c } from "./index103.mjs";
import { cn as s } from "./index104.mjs";
import p from "./index105.mjs";
const u = m, N = n.forwardRef(({ className: e, ...o }, a) => /* @__PURE__ */ t(
  l,
  {
    ref: a,
    className: s("border-b", e),
    ...o
  }
));
N.displayName = "AccordionItem";
const h = n.forwardRef(({ className: e, children: o, ...a }, r) => /* @__PURE__ */ t(f, { className: "flex", children: /* @__PURE__ */ d(
  c,
  {
    ref: r,
    className: s(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      e
    ),
    ...a,
    children: [
      o,
      /* @__PURE__ */ t(p, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
h.displayName = c.displayName;
const w = n.forwardRef(({ className: e, children: o, ...a }, r) => /* @__PURE__ */ t(
  i,
  {
    ref: r,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...a,
    children: /* @__PURE__ */ t("div", { className: s("pb-4 pt-0", e), children: o })
  }
));
w.displayName = i.displayName;
export {
  u as Accordion,
  w as AccordionContent,
  N as AccordionItem,
  h as AccordionTrigger
};
//# sourceMappingURL=index3.mjs.map
