import { jsxs as i, jsx as m } from "react/jsx-runtime";
import * as o from "react";
import { cn as d } from "../../lib/utils.mjs";
const n = o.forwardRef(
  ({ className: e, required: r, invisible: a, children: t, ...s }, l) => /* @__PURE__ */ i(
    "label",
    {
      ref: l,
      className: d(
        "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
        a && "invisible",
        e
      ),
      ...s,
      children: [
        r && /* @__PURE__ */ m("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
        t
      ]
    }
  )
);
n.displayName = "FormLabel";
export {
  n as FormLabel
};
//# sourceMappingURL=form-label.mjs.map
