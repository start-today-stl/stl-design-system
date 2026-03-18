import { jsxs as d, jsx as e } from "react/jsx-runtime";
import * as l from "react";
import { cn as n } from "../../lib/utils.mjs";
import { inputSizeStyles as h } from "./input.mjs";
const x = l.forwardRef(
  ({ className: i, label: t, error: o, errorMessage: r, size: s = "full", reserveLabelSpace: a, required: c, children: u, ...p }, f) => {
    const m = l.useId();
    return /* @__PURE__ */ d("div", { ref: f, className: n("flex flex-col gap-1", h[s], i), ...p, children: [
      (t || a) && /* @__PURE__ */ d(
        "label",
        {
          htmlFor: m,
          className: n(
            "flex items-center gap-1 text-xs text-slate-700 dark:text-slate-400",
            !t && "invisible"
          ),
          children: [
            c && /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
            t || " "
          ]
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          className: n(
            "flex",
            // 첫 번째 자식: 오른쪽 radius 제거
            "[&>*:first-child]:rounded-r-none",
            "[&>*:first-child_input]:rounded-r-none",
            // 마지막 자식: 왼쪽 radius 제거
            "[&>*:last-child]:rounded-l-none",
            "[&>*:last-child_input]:rounded-l-none",
            // 중간 자식들: 모든 radius 제거
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:first-child):not(:last-child)_input]:rounded-none",
            // 마지막 자식 제외: 오른쪽 border 제거
            "[&>*:not(:last-child)]:border-r-0",
            "[&>*:not(:last-child)_input]:border-r-0"
          ),
          children: u
        }
      ),
      o && r && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: r })
    ] });
  }
);
x.displayName = "InputGroup";
export {
  x as InputGroup
};
//# sourceMappingURL=input-group.mjs.map
