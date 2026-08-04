import { jsxs as i, jsx as a } from "react/jsx-runtime";
import * as c from "react";
import { cn as d } from "../../../lib/utils.mjs";
import { Popover as h, PopoverTrigger as m, PopoverContent as b } from "../../ui/popover.mjs";
import { FilterIcon as g } from "../../../icons/FilterIcon.mjs";
import { DefaultNumberRangeFilter as f, DefaultDateRangeFilter as x, DefaultMultiSelectFilter as k, DefaultSelectFilter as F, DefaultTextFilter as D } from "./data-table-v2-default-filters.mjs";
function j({
  column: e,
  filter: o,
  value: n,
  active: r,
  onChange: l
}) {
  const [t, s] = c.useState(!1), p = c.useCallback(() => s(!1), []);
  return /* @__PURE__ */ i(h, { open: t, onOpenChange: s, children: [
    /* @__PURE__ */ a(m, { asChild: !0, children: /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        className: d(
          "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
          "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
          "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
          r && "text-blue-600 dark:text-blue-400"
        ),
        "aria-label": `${typeof e.header == "string" ? e.header : "컬럼"} 필터`,
        onClick: (u) => u.stopPropagation(),
        children: [
          /* @__PURE__ */ a(g, { size: 20 }),
          r && /* @__PURE__ */ a(
            "span",
            {
              "aria-hidden": !0,
              className: "absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(b, { align: "end", className: "w-64 p-3", children: R(o, n, l, p, e) })
  ] });
}
function R(e, o, n, r, l) {
  switch (e.type) {
    case "text":
      return /* @__PURE__ */ a(
        D,
        {
          value: o,
          onChange: (t) => n(t),
          onClose: r,
          placeholder: e.placeholder
        }
      );
    case "select":
      return /* @__PURE__ */ a(
        F,
        {
          value: o,
          onChange: (t) => n(t),
          onClose: r,
          options: e.options,
          placeholder: e.placeholder
        }
      );
    case "multiSelect":
      return /* @__PURE__ */ a(
        k,
        {
          value: o,
          onChange: (t) => n(t),
          onClose: r,
          options: e.options,
          placeholder: e.placeholder
        }
      );
    case "dateRange":
      return /* @__PURE__ */ a(
        x,
        {
          value: o,
          onChange: (t) => n(t),
          onClose: r
        }
      );
    case "numberRange":
      return /* @__PURE__ */ a(
        f,
        {
          value: o,
          onChange: (t) => n(t),
          onClose: r
        }
      );
    case "custom":
      return e.component({
        value: o,
        onChange: n,
        onClose: r,
        column: l
      });
  }
}
export {
  j as DataTableV2FilterCell
};
//# sourceMappingURL=data-table-v2-filter-cell.mjs.map
