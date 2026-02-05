import { jsxs as p, jsx as t } from "react/jsx-runtime";
import * as o from "react";
import { cn as d } from "./index104.mjs";
import { inputSizeStyles as x } from "./index34.mjs";
const u = o.forwardRef(
  ({ className: l, label: e, error: n, errorMessage: r, size: a = "full", children: s, ...i }, c) => {
    const m = o.useId();
    return /* @__PURE__ */ p("div", { ref: c, className: d("flex flex-col gap-1", x[a], l), ...i, children: [
      e && /* @__PURE__ */ t(
        "label",
        {
          htmlFor: m,
          className: "text-[length:var(--text-body-2)] text-gray-600 dark:text-gray-50",
          children: e
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: d(
            "flex",
            "[&>*:first-child]:rounded-r-none",
            "[&>*:last-child]:rounded-l-none",
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:last-child)]:border-r-0"
          ),
          children: s
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
//# sourceMappingURL=index35.mjs.map
