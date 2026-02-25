import { jsxs as l, jsx as t } from "react/jsx-runtime";
import * as d from "react";
import { cn as r } from "../../lib/utils.mjs";
import { inputSizeStyles as f } from "./input.mjs";
const h = d.forwardRef(
  ({ className: n, label: e, error: o, errorMessage: s, size: i = "full", reserveLabelSpace: a, required: c, children: m, ...p }, u) => {
    const x = d.useId();
    return /* @__PURE__ */ l("div", { ref: u, className: r("flex flex-col gap-1", f[i], n), ...p, children: [
      (e || a) && /* @__PURE__ */ l(
        "label",
        {
          htmlFor: x,
          className: r(
            "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
            !e && "invisible"
          ),
          children: [
            c && /* @__PURE__ */ t("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
            e || " "
          ]
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: r(
            "flex",
            "[&>*:first-child]:rounded-r-none",
            "[&>*:last-child]:rounded-l-none",
            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
            "[&>*:not(:last-child)]:border-r-0"
          ),
          children: m
        }
      ),
      o && s && /* @__PURE__ */ t("span", { className: "text-xs text-destructive dark:text-red-400", children: s })
    ] });
  }
);
h.displayName = "InputGroup";
export {
  h as InputGroup
};
//# sourceMappingURL=input-group.mjs.map
