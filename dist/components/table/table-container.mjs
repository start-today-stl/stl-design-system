import { jsx as d } from "react/jsx-runtime";
import * as s from "react";
import { cn as t } from "../../lib/utils.mjs";
const f = s.forwardRef(
  ({ className: e, children: r, grow: o = !1, ...a }, l) => /* @__PURE__ */ d(
    "div",
    {
      ref: l,
      className: t(
        "rounded-2xl overflow-hidden shadow-sm flex flex-col",
        "border border-slate-200 dark:border-slate-700",
        o && "flex-1 min-h-0",
        e
      ),
      ...a,
      children: r
    }
  )
);
f.displayName = "TableContainer";
export {
  f as TableContainer
};
//# sourceMappingURL=table-container.mjs.map
