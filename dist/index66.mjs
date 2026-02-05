import { jsx as r } from "react/jsx-runtime";
import * as a from "react";
import { Root as s, Item as t, Indicator as l } from "./index124.mjs";
import { cn as c } from "./index104.mjs";
import m from "./index119.mjs";
const n = a.forwardRef(({ className: e, ...o }, i) => /* @__PURE__ */ r(
  s,
  {
    className: c("grid gap-2", e),
    ...o,
    ref: i
  }
));
n.displayName = s.displayName;
const d = a.forwardRef(({ className: e, ...o }, i) => /* @__PURE__ */ r(
  t,
  {
    ref: i,
    className: c(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...o,
    children: /* @__PURE__ */ r(l, { className: "flex items-center justify-center", children: /* @__PURE__ */ r(m, { className: "h-2.5 w-2.5 fill-current text-current" }) })
  }
));
d.displayName = t.displayName;
export {
  n as RadioGroup,
  d as RadioGroupItem
};
//# sourceMappingURL=index66.mjs.map
