import { jsxs as m, jsx as e } from "react/jsx-runtime";
import * as s from "react";
import { Root as t, Viewport as n, Corner as f, ScrollAreaScrollbar as c, ScrollAreaThumb as p } from "../../node_modules/@radix-ui/react-scroll-area/dist/index.mjs";
import { cn as d } from "../../lib/utils.mjs";
const h = s.forwardRef(({ className: l, children: r, ...o }, a) => /* @__PURE__ */ m(
  t,
  {
    ref: a,
    className: d("relative overflow-hidden", l),
    ...o,
    children: [
      /* @__PURE__ */ e(n, { className: "h-full w-full rounded-[inherit]", children: r }),
      /* @__PURE__ */ e(i, {}),
      /* @__PURE__ */ e(f, {})
    ]
  }
));
h.displayName = t.displayName;
const i = s.forwardRef(({ className: l, orientation: r = "vertical", ...o }, a) => /* @__PURE__ */ e(
  c,
  {
    ref: a,
    orientation: r,
    className: d(
      "flex touch-none select-none transition-colors",
      r === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      r === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      l
    ),
    ...o,
    children: /* @__PURE__ */ e(p, { className: "relative flex-1 rounded-full bg-border" })
  }
));
i.displayName = c.displayName;
export {
  h as ScrollArea,
  i as ScrollBar
};
//# sourceMappingURL=scroll-area.mjs.map
