import { jsx as a } from "react/jsx-runtime";
import * as n from "react";
import { cn as f } from "../lib/utils.mjs";
const p = n.forwardRef(
  ({ className: r, padded: t = !0, children: o, ...e }, m) => /* @__PURE__ */ a(
    "div",
    {
      ref: m,
      className: f(
        "h-full",
        t && "p-4",
        r
      ),
      ...e,
      children: o
    }
  )
);
p.displayName = "Content";
export {
  p as Content
};
//# sourceMappingURL=content.mjs.map
