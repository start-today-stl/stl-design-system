import { jsxs as d, jsx as e } from "react/jsx-runtime";
import * as s from "react";
import * as r from "@radix-ui/react-scroll-area";
import { cn as t } from "../../lib/utils.mjs";
const m = s.forwardRef(({ className: o, children: l, ...a }, c) => /* @__PURE__ */ d(
  r.Root,
  {
    ref: c,
    className: t("relative overflow-hidden", o),
    ...a,
    children: [
      /* @__PURE__ */ e(r.Viewport, { className: "h-full w-full rounded-[inherit]", children: l }),
      /* @__PURE__ */ e(i, {}),
      /* @__PURE__ */ e(r.Corner, {})
    ]
  }
));
m.displayName = r.Root.displayName;
const i = s.forwardRef(({ className: o, orientation: l = "vertical", ...a }, c) => /* @__PURE__ */ e(
  r.ScrollAreaScrollbar,
  {
    ref: c,
    orientation: l,
    className: t(
      "flex touch-none select-none transition-colors",
      l === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      l === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      o
    ),
    ...a,
    children: /* @__PURE__ */ e(r.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
i.displayName = r.ScrollAreaScrollbar.displayName;
export {
  m as ScrollArea,
  i as ScrollBar
};
//# sourceMappingURL=scroll-area.mjs.map
