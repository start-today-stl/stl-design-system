import { jsxs as s, jsx as o } from "react/jsx-runtime";
import * as a from "react";
import * as e from "@radix-ui/react-slider";
import { cn as n } from "../../lib/utils.mjs";
const t = a.forwardRef(({ className: r, ...i }, l) => /* @__PURE__ */ s(
  e.Root,
  {
    ref: l,
    className: n(
      "relative flex w-full touch-none select-none items-center",
      r
    ),
    ...i,
    children: [
      /* @__PURE__ */ o(e.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ o(e.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ o(e.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
t.displayName = e.Root.displayName;
export {
  t as Slider
};
//# sourceMappingURL=slider.mjs.map
