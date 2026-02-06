import { jsx as t, jsxs as c } from "react/jsx-runtime";
import * as i from "react";
import * as e from "@radix-ui/react-accordion";
import { ChevronDown as d } from "lucide-react";
import { cn as s } from "../../lib/utils.mjs";
const w = e.Root, m = i.forwardRef(({ className: o, ...a }, r) => /* @__PURE__ */ t(
  e.Item,
  {
    ref: r,
    className: s("border-b", o),
    ...a
  }
));
m.displayName = "AccordionItem";
const l = i.forwardRef(({ className: o, children: a, ...r }, n) => /* @__PURE__ */ t(e.Header, { className: "flex", children: /* @__PURE__ */ c(
  e.Trigger,
  {
    ref: n,
    className: s(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      o
    ),
    ...r,
    children: [
      a,
      /* @__PURE__ */ t(d, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
l.displayName = e.Trigger.displayName;
const f = i.forwardRef(({ className: o, children: a, ...r }, n) => /* @__PURE__ */ t(
  e.Content,
  {
    ref: n,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...r,
    children: /* @__PURE__ */ t("div", { className: s("pb-4 pt-0", o), children: a })
  }
));
f.displayName = e.Content.displayName;
export {
  w as Accordion,
  f as AccordionContent,
  m as AccordionItem,
  l as AccordionTrigger
};
//# sourceMappingURL=accordion.mjs.map
