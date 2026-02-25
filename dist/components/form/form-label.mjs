import { jsxs as o, jsx as i } from "react/jsx-runtime";
import * as m from "react";
import { cn as n } from "../../lib/utils.mjs";
const d = m.forwardRef(
  ({ className: e, required: a, invisible: r, children: t, ...s }, l) => /* @__PURE__ */ o(
    "label",
    {
      ref: l,
      className: n(
        "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
        r && "invisible",
        e
      ),
      ...s,
      children: [
        a && /* @__PURE__ */ i("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
        t
      ]
    }
  )
);
d.displayName = "FormLabel";
export {
  d as FormLabel
};
//# sourceMappingURL=form-label.mjs.map
