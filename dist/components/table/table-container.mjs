import { jsx as d } from "react/jsx-runtime";
import * as t from "react";
import { cn as s } from "../../lib/utils.mjs";
const m = t.forwardRef(
  ({ className: r, children: e, ...o }, a) => /* @__PURE__ */ d(
    "div",
    {
      ref: a,
      className: s(
        "rounded-lg overflow-hidden shadow-sm",
        "border border-slate-200 dark:border-slate-700",
        r
      ),
      ...o,
      children: e
    }
  )
);
m.displayName = "TableContainer";
export {
  m as TableContainer
};
//# sourceMappingURL=table-container.mjs.map
