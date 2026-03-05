import { jsxs as t, jsx as a } from "react/jsx-runtime";
import * as n from "react";
import { cn as x } from "../../lib/utils.mjs";
const b = n.forwardRef(
  ({
    className: l,
    totalCount: r,
    selectedCount: s = 0,
    formatTotal: i = (e) => `총 ${e.toLocaleString()}건`,
    formatSelected: o = (e) => `${e}개 선택`,
    children: d,
    ...m
  }, c) => /* @__PURE__ */ t(
    "div",
    {
      ref: c,
      className: x(
        "flex items-center gap-2 py-3 px-4",
        "bg-white dark:bg-slate-900",
        "border-b border-slate-200 dark:border-slate-700",
        l
      ),
      ...m,
      children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2 shrink-0", children: [
          r !== void 0 && /* @__PURE__ */ a("span", { className: "text-base font-semibold text-slate-600 dark:text-slate-300", children: i(r) }),
          s > 0 && /* @__PURE__ */ a("span", { className: "text-xs text-blue-500", children: o(s) })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex-1 flex items-center justify-end gap-2", children: d })
      ]
    }
  )
);
b.displayName = "TableToolbar";
export {
  b as TableToolbar
};
//# sourceMappingURL=table-toolbar.mjs.map
