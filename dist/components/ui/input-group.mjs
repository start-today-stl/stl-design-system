import { jsxs as p, jsx as t } from "react/jsx-runtime";
import * as l from "react";
import { cn as o } from "../../lib/utils.mjs";
import { inputSizeStyles as x } from "./input.mjs";
const u = l.forwardRef(
  ({ className: d, label: e, error: n, errorMessage: r, size: s = "full", children: a, ...i }, c) => {
    const m = l.useId();
    return /* @__PURE__ */ p("div", { ref: c, className: o("flex flex-col gap-1", x[s], d), ...i, children: [
      e && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: m,
          className: "text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50",
          children: e
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: o(
            "flex",
            "[&>*:first-child]:rounded-r-none",
            "[&>*:last-child]:rounded-l-none",
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:last-child)]:border-r-0"
          ),
          children: a
        }
      ),
      n && r && /* @__PURE__ */ t("span", { className: "text-[length:var(--text-body-2)] text-destructive dark:text-red-400", children: r })
    ] });
  }
);
u.displayName = "InputGroup";
export {
  u as InputGroup
};
//# sourceMappingURL=input-group.mjs.map
