import { jsx as n } from "react/jsx-runtime";
import * as p from "react";
import { cn as a } from "../lib/utils.mjs";
const f = p.forwardRef(
  ({ className: t, padded: r = !0, children: o, ...e }, m) => /* @__PURE__ */ n(
    "div",
    {
      ref: m,
      className: a(
        "min-h-full",
        r && "px-4 pt-2 pb-4",
        t
      ),
      ...e,
      children: o
    }
  )
);
f.displayName = "Content";
export {
  f as Content
};
//# sourceMappingURL=content.mjs.map
