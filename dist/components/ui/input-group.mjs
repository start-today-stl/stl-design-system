import { jsxs as r, jsx as n } from "react/jsx-runtime";
import * as o from "react";
import { cn as e } from "../../lib/utils.mjs";
import { inputSizeStyles as m } from "./input.mjs";
const x = o.forwardRef(
  ({ className: l, label: t, error: i, errorMessage: d, size: s = "full", reserveLabelSpace: a, required: c, children: u, ...h }, p) => {
    const f = o.useId();
    return /* @__PURE__ */ r("div", { ref: p, className: e("flex flex-col gap-1", m[s], l), ...h, children: [
      (t || a) && /* @__PURE__ */ r(
        "label",
        {
          htmlFor: f,
          className: e(
            "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
            !t && "invisible"
          ),
          children: [
            c && /* @__PURE__ */ n("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
            t || " "
          ]
        }
      ),
      /* @__PURE__ */ n(
        "div",
        {
          className: e(
            "flex",
            // 첫 번째 자식: 오른쪽 radius 제거
            "[&>*:first-child]:rounded-r-none",
            "[&>*:first-child_input]:rounded-r-none",
            "[&>*:first-child_button]:rounded-r-none",
            // 마지막 자식: 왼쪽 radius 제거
            "[&>*:last-child]:rounded-l-none",
            "[&>*:last-child_input]:rounded-l-none",
            "[&>*:last-child_button]:rounded-l-none",
            // 중간 자식들: 모든 radius 제거
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:first-child):not(:last-child)_input]:rounded-none",
            "[&>*:not(:first-child):not(:last-child)_button]:rounded-none",
            // 마지막 자식 제외: 오른쪽 border 제거
            "[&>*:not(:last-child)]:border-r-0",
            "[&>*:not(:last-child)_input]:border-r-0",
            "[&>*:not(:last-child)_button]:border-r-0"
          ),
          children: u
        }
      ),
      i && d && /* @__PURE__ */ n("span", { className: "text-xs text-destructive dark:text-red-400", children: d })
    ] });
  }
);
x.displayName = "InputGroup";
export {
  x as InputGroup
};
//# sourceMappingURL=input-group.mjs.map
