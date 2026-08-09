import { jsxs as d, jsx as a } from "react/jsx-runtime";
import * as n from "react";
import { cn as b } from "../../../lib/utils.mjs";
import { Popover as g, PopoverTrigger as f, PopoverContent as x } from "../../ui/popover.mjs";
import { FilterIcon as k } from "../../../icons/FilterIcon.mjs";
import { DefaultNumberRangeFilter as F, DefaultDateRangeFilter as D, DefaultMultiSelectFilter as y, DefaultSelectFilter as M, DefaultTextFilter as R } from "./data-table-v2-default-filters.mjs";
function w({
  column: e,
  filter: l,
  value: o,
  active: r,
  onChange: s,
  columnKey: t
}) {
  const u = n.useCallback(
    (c) => s(t, c),
    [s, t]
  ), [h, i] = n.useState(!1), m = n.useCallback(() => i(!1), []), p = `${typeof e.header == "string" ? e.header : "컬럼"} 필터`;
  return /* @__PURE__ */ d(g, { open: h, onOpenChange: i, children: [
    /* @__PURE__ */ a(f, { asChild: !0, children: /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: b(
          "relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded transition-colors",
          "text-slate-400 hover:text-slate-700 hover:bg-slate-200/60",
          "dark:text-slate-500 dark:hover:text-slate-100 dark:hover:bg-slate-700/60",
          r && "text-blue-600 dark:text-blue-400"
        ),
        "aria-label": p,
        onClick: (c) => c.stopPropagation(),
        children: [
          /* @__PURE__ */ a(k, { size: 20 }),
          r && /* @__PURE__ */ a(
            "span",
            {
              "aria-hidden": !0,
              "data-filter-active": "",
              className: "absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ a(x, { align: "end", className: "w-64 p-3", "aria-label": p, children: C(l, o, u, m, e) })
  ] });
}
const v = n.memo(
  w
);
function C(e, l, o, r, s) {
  switch (e.type) {
    case "text":
      return /* @__PURE__ */ a(
        R,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r,
          placeholder: e.placeholder
        }
      );
    case "select":
      return /* @__PURE__ */ a(
        M,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage
        }
      );
    case "multiSelect":
      return /* @__PURE__ */ a(
        y,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r,
          options: e.options,
          placeholder: e.placeholder,
          emptyMessage: e.emptyMessage
        }
      );
    case "dateRange":
      return /* @__PURE__ */ a(
        D,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r
        }
      );
    case "numberRange":
      return /* @__PURE__ */ a(
        F,
        {
          value: l,
          onChange: (t) => o(t),
          onClose: r
        }
      );
    case "custom":
      return e.component({
        value: l,
        onChange: o,
        onClose: r,
        column: s
      });
  }
}
export {
  v as DataTableV2FilterCell
};
//# sourceMappingURL=data-table-v2-filter-cell.mjs.map
