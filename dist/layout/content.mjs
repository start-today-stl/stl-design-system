import { jsx as m } from "react/jsx-runtime";
import * as p from "react";
import { cn as a } from "../lib/utils.mjs";
const l = p.forwardRef(
  ({ className: t, padded: o = !0, children: r, ...e }, f) => /* @__PURE__ */ m(
    "div",
    {
      ref: f,
      className: a(
        "h-full flex flex-col",
        o && "px-4 pt-2.5 pb-4",
        t
      ),
      ...e,
      children: r
    }
  )
);
l.displayName = "Content";
export {
  l as Content
};
//# sourceMappingURL=content.mjs.map
