import { jsx as a } from "react/jsx-runtime";
import * as l from "react";
import { cn as m } from "../lib/utils.mjs";
const p = l.forwardRef(
  ({ className: o, padded: t = !0, children: r, ...e }, f) => /* @__PURE__ */ a(
    "div",
    {
      ref: f,
      className: m(
        "h-full flex flex-col overflow-auto",
        t && "px-4 pt-2.5 pb-4",
        o
      ),
      ...e,
      children: r
    }
  )
);
p.displayName = "Content";
export {
  p as Content
};
//# sourceMappingURL=content.mjs.map
