import { jsxs as x, jsx as e } from "react/jsx-runtime";
import * as l from "react";
import { cn as r } from "../../lib/utils.mjs";
import { inputSizeStyles as u } from "./input.mjs";
const f = l.forwardRef(
  ({ className: o, label: t, error: d, errorMessage: s, size: n = "full", reserveLabelSpace: i, children: a, ...c }, m) => {
    const p = l.useId();
    return /* @__PURE__ */ x("div", { ref: m, className: r("flex flex-col gap-1", u[n], o), ...c, children: [
      (t || i) && /* @__PURE__ */ e(
        "label",
        {
          htmlFor: p,
          className: r(
            "text-xs text-slate-600 dark:text-slate-50",
            !t && "invisible"
          ),
          children: t || " "
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: r(
            "flex",
            "[&>*:first-child]:rounded-r-none",
            "[&>*:last-child]:rounded-l-none",
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:last-child)]:border-r-0"
          ),
          children: a
        }
      ),
      d && s && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: s })
    ] });
  }
);
f.displayName = "InputGroup";
export {
  f as InputGroup
};
//# sourceMappingURL=input-group.mjs.map
