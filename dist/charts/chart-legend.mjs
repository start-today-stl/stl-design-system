import { jsx as r, jsxs as d } from "react/jsx-runtime";
import * as o from "react";
import { cn as c } from "../lib/utils.mjs";
const p = o.forwardRef(
  ({ items: e, className: l, ...n }, t) => e != null && e.length ? /* @__PURE__ */ r(
    "div",
    {
      ref: t,
      className: c(
        "flex flex-wrap items-center justify-end gap-4 px-2 py-1",
        l
      ),
      ...n,
      children: e.map((a, s) => /* @__PURE__ */ d(
        "div",
        {
          className: "flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300",
          children: [
            /* @__PURE__ */ r(
              "span",
              {
                "aria-hidden": !0,
                className: "size-2 rounded-full shrink-0",
                style: { backgroundColor: a.color }
              }
            ),
            /* @__PURE__ */ r("span", { children: a.label })
          ]
        },
        s
      ))
    }
  ) : null
);
p.displayName = "ChartLegend";
export {
  p as ChartLegend
};
//# sourceMappingURL=chart-legend.mjs.map
