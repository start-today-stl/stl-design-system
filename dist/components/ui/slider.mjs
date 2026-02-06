import { jsxs as s, jsx as e } from "react/jsx-runtime";
import * as n from "react";
import { Root as o, Track as a, Range as c, Thumb as t } from "../../node_modules/@radix-ui/react-slider/dist/index.mjs";
import { cn as d } from "../../lib/utils.mjs";
const f = n.forwardRef(({ className: r, ...i }, l) => /* @__PURE__ */ s(
  o,
  {
    ref: l,
    className: d(
      "relative flex w-full touch-none select-none items-center",
      r
    ),
    ...i,
    children: [
      /* @__PURE__ */ e(a, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ e(c, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ e(t, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
f.displayName = o.displayName;
export {
  f as Slider
};
//# sourceMappingURL=slider.mjs.map
